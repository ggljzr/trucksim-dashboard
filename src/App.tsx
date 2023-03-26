import React from 'react';
import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import mqtt from "mqtt/dist/mqtt";

import { toast } from 'react-toastify';

import Header from './components/Header';

import MapPage from './pages/MapPage';
import JobPage from './pages/JobPage';
import TruckPage from './pages/TruckPage';
import SettingsPage from './pages/SettingsPage';

import { Job, Truck, Value, DPlacement } from './types';

import { decodePayload, minutesToDate } from './utils';

import './App.css';

// austin repair shop
const testPlacement: DPlacement = { x: -8771.726577758789, y: 8.502845764160156, z: 50302.0234375, heading: 0, pitch: 0, roll: 0 }

function App() {
  const [mqttConnected, setMqttConnected] = useState(false);

  const [gameTime, setGameTime] = useState(minutesToDate(0));
  // next rest stop in minutes
  const [nextRestStop, setNextRestStop] = useState<number | null>(null);

  const [job, setJob] = useState<Job | null>(null);
  const [truck, setTruck] = useState<Truck | null>(null);

  const [currentPlacement, setCurrentPlacement] = useState<DPlacement | null>(testPlacement);

  useEffect(() => {
    console.log(process.env.REACT_APP_MQTT_BROKER_URL);
    const client = mqtt.connect(process.env.REACT_APP_MQTT_BROKER_URL as string);
    client.on('connect', () => setMqttConnected(true));

    client.on('message', (topic, payload, packet) => {
      switch (topic) {
        case 'trucksim/event/config/job':
          setJob(decodePayload<Job>(payload));
          break;
        case 'trucksim/event/config/truck':
          setTruck(decodePayload<Truck>(payload));
          break;
        case 'trucksim/channel/game/time':
          // we recieved game time since the 00:00 of the first day in minutes
          // we need to convert it to milliseconds
          const t = minutesToDate(decodePayload<Value>(payload).value);
          setGameTime(t);
          break;
        case 'trucksim/channel/rest/stop':
          setNextRestStop(decodePayload<Value>(payload).value);
          break;
        case 'trucksim/channel/truck/world/placement':
          setCurrentPlacement(decodePayload<DPlacement>(payload));
          break;
      }
    });

    client.subscribe('trucksim/event/config/job');
    client.subscribe('trucksim/event/config/truck');

    client.subscribe('trucksim/channel/game/time');
    client.subscribe('trucksim/channel/rest/stop');
    client.subscribe('trucksim/channel/truck/world/placement');
  }, []);

  useEffect(() => {
    if (mqttConnected) toast.success('Connected to MQTT broker');
  }, [mqttConnected]);

  useEffect(() => {
    if (nextRestStop && nextRestStop === 120) toast.warning('Next rest stop in 2 hours');
  }, [nextRestStop]);

  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Header mqttConnected={mqttConnected} gameTime={gameTime} />

        <Routes>
          <Route path="/" element={<Navigate to="/map" />} />
          <Route path="/map" element={<MapPage currentPlacement={currentPlacement} />} />
          <Route path="/job" element={<JobPage job={job} nextRestStop={nextRestStop} />} />
          <Route path="/truck" element={<TruckPage truck={truck} />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>

      </BrowserRouter>
    </Container>
  );
}

export default App;
