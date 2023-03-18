import React from 'react';

import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';

import MapPage from './pages/MapPage';
import JobPage from './pages/JobPage';
import TruckPage from './pages/TruckPage';
import SettingsPage from './pages/SettingsPage';


import './App.css';


function App() {
  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Navigate to="/map" />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/job" element={<JobPage />} />
          <Route path="/truck" element={<TruckPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>

      </BrowserRouter>
    </Container>
  );
}

export default App;
