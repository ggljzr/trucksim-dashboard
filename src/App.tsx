import React from 'react';

import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AdvisorPage from './pages/AdvisorPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';


function App() {
  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/advisor" />} />
          <Route path="/advisor" element={<AdvisorPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
