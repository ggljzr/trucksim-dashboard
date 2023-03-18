import { MapContainer, TileLayer } from 'react-leaflet'

export default function Map() {
    return (
        <div>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
                integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
                crossOrigin="" />

            <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
                integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
                crossOrigin=""></script>

            <MapContainer center={[0, 0]} zoom={3} minZoom={3} scrollWheelZoom={false} style={{ height: "600px", width: "600px" }}>
                <TileLayer
                    attribution="<a href='https://github.com/Unicor-p/SCS_Map_Tiles'>Unicor-p</a>"
                    url={process.env.PUBLIC_URL + "/SCS_Map_Tiles/ats/latest/Tiles/{z}/{x}/{y}.png"}
                />
            </MapContainer>
        </div>);
}