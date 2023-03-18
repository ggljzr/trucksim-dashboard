import React from 'react';

import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import MapPage from './pages/MapPage';
import SettingsPage from './pages/SettingsPage';


import './App.css';


function App() {
  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Navigate to="/advisor" />} />
          <Route path="/advisor" element={<MapPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </Container>
  );
}

export default App;
