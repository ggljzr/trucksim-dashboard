import React from 'react';
import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';

import MapPage from './pages/MapPage';
import JobPage from './pages/JobPage';
import TruckPage from './pages/TruckPage';
import DriverPage from './pages/DriverPage';
import SettingsPage from './pages/SettingsPage';

import { Job, Truck } from './types';

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

const testTruck: Truck = {
  'adblue_capacity': 80.0,
  'adblue_warning_factor': 0.15000000596046448,
  'battery_voltage_warning': 11.880000114440918,
  'brake_air_pressure_emergency': 29.579999923706055,
  'brake_air_pressure_warning': 59.15999984741211,
  'brand': 'Kenworth',
  'brand_id': 'kenworth',
  'cabin_position': { 'x': 0.0, 'y': 3.0, 'z': -2.0 },
  'differential_ratio': 3.25,
  'forward_ratio': 0.7300000190734863,
  'fuel_capacity': 833.0,
  'fuel_warning_factor': 0.15000000596046448,
  'gears_forward': 18,
  'gears_reverse': 4,
  'head_position': {
    'x': -0.42330673336982727,
    'y': -0.5754554271697998,
    'z': 0.3827627897262573
  },
  'hook_position': { 'x': 0.0, 'y': 1.0, 'z': 3.594026803970337 },
  'id': 'vehicle.kenworth.w900',
  'license_plate': 'R56-9388',
  'license_plate_country': 'Texas',
  'license_plate_country_id': 'texas',
  'name': 'W900',
  'oil_pressure_warning': 10.149999618530273,
  'retarder_steps': 3,
  'reverse_ratio': -3.430000066757202,
  'rpm_limit': 2100.0,
  'water_temperature_warning': 105.0,
  'wheel_position': {
    'x': 0.960354208946228,
    'y': 0.5059999823570251,
    'z': 4.1931939125061035
  },
  'wheel_powered': 1,
  'wheel_radius': 0.5072842240333557,
  'wheel_simulated': 1,
  'wheel_steerable': 0,
  'wheels_count': 6
}

function App() {
  const [job, setJob] = useState<Job | undefined>(testJob);
  const [truck, setTruck] = useState<Truck | undefined>(testTruck);

  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Header />

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
