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

import { Job, Truck } from './types';

import { decodePayload } from './utils';

import './App.css';

function App() {
  const [mqttConnected, setMqttConnected] = useState(false);

  const [job, setJob] = useState<Job | undefined>(undefined);
  const [truck, setTruck] = useState<Truck | undefined>(undefined);

  useEffect(() => {
    const client = mqtt.connect('ws://localhost:8080');
    client.on('connect', () => setMqttConnected(true));

    client.on('message', (topic, payload, packet) => {
      if (topic === 'trucksim/event/config/job') {
        setJob(decodePayload<Job>(payload));
        return;
      }

      if (topic === 'trucksim/event/config/truck') {
        setTruck(decodePayload<Truck>(payload));
        return;
      }
    });

    client.subscribe('trucksim/event/config/job');
    client.subscribe('trucksim/event/config/truck');
  }, []);

  useEffect(() => {
    if (mqttConnected) toast.success('Connected to MQTT broker');
  }, [mqttConnected]);

  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Header mqttConnected={mqttConnected} />

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
