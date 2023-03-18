import React from 'react';
import './App.css';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


function App() {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
        crossOrigin="" />

      <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
        integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
        crossOrigin=""></script>

      {process.env.PUBLIC_URL}
      <MapContainer center={[0, 0]} zoom={3} minZoom={3} scrollWheelZoom={false} style={{ height: "600px" }}>
        <TileLayer
          attribution='https://github.com/Unicor-p/SCS_Map_Tiles'
          url={process.env.PUBLIC_URL + "/SCS_Map_Tiles/ats/latest/Tiles/{z}/{x}/{y}.png"}
        />
      </MapContainer>
    </div>
  );
}

export default App;
