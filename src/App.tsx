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
import DriverPage from './pages/DriverPage';
import SettingsPage from './pages/SettingsPage';

import { Job, Truck, Value } from './types';

import { decodePayload } from './utils';

import './App.css';

function App() {
  const [mqttConnected, setMqttConnected] = useState(false);

  const [gameTime, setGameTime] = useState(new Date(0));

  const [job, setJob] = useState<Job | undefined>(undefined);
  const [truck, setTruck] = useState<Truck | undefined>(undefined);

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
          const t = new Date(decodePayload<Value>(payload).value * 60 * 1000);
          setGameTime(t);
      }
    });

    client.subscribe('trucksim/event/config/job');
    client.subscribe('trucksim/event/config/truck');

    client.subscribe('trucksim/channel/game/time');
  }, []);

  useEffect(() => {
    if (mqttConnected) toast.success('Connected to MQTT broker');
  }, [mqttConnected]);

  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Header mqttConnected={mqttConnected} gameTime={gameTime} />

        <Routes>
          <Route path="/" element={<Navigate to="/map" />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/job" element={<JobPage job={job} />} />
          <Route path="/truck" element={<TruckPage truck={truck} />} />
          <Route path="/driver" element={<DriverPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>

      </BrowserRouter>
    </Container>
  );
}

export default App;
