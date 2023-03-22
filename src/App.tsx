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
  'cargo': 'Space Container',
  'cargo_id': 'space_cont',
  'cargo_loaded': true,
  'cargo_mass': 12020.2001953125,
  'cargo_unit_count': 1,
  'cargo_unit_mass': 12020.2001953125,
  'delivery_time': 100135,
  'destination_city': 'Raton',
  'destination_city_id': 'raton',
  'destination_company': 'Rail Export',
  'destination_company_id': 're_train',
  'income': 66445,
  'is_special_job': false,
  'job_market': 'quick_job',
  'planned_distance_km': 1375,
  'source_city': 'Houston',
  'source_city_id': 'houston',
  'source_company': 'Space Center',
  'source_company_id': 'spc_whs'
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
