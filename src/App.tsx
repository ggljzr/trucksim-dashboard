import React from 'react';
import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';

import MapPage from './pages/MapPage';
import JobPage from './pages/JobPage';
import TruckPage from './pages/TruckPage';
import SettingsPage from './pages/SettingsPage';

import { Job } from './types';

import './App.css';

const testJob: Job = {
  cargo_id: "test",
  cargo: "test",
  cargo_mass: 123,
  destination_city: "test",
  destination_company: "test",
  is_cargo_loaded: false,
  job_market: "test",
  delivery_time: "test",
  income: 5555,
}

function App() {
  const [job, setJob] = useState<Job | undefined>(testJob);

  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Navigate to="/map" />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/job" element={<JobPage job={job} />} />
          <Route path="/truck" element={<TruckPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>

      </BrowserRouter>
    </Container>
  );
}

export default App;
