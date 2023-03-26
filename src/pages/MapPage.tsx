import { useState, useEffect } from 'react';
import { LatLng, LatLngBounds, CRS } from 'leaflet';
import { MapContainer, TileLayer, Circle } from 'react-leaflet'

import { DPlacement } from '../types';
import PlayerMarker from '../components/map/PlayerMarker';
import Body from '../components/Body';

import LocationMarker from '../components/map/LocationMarker';

interface Props {
    currentPlacement: DPlacement | null,
}

export default function MapPage({ currentPlacement }: Props) {
    const bounds = new LatLngBounds([-0.14083500491548762, 0.15625], [-255.8694486014055, 255.76590296171884])
    const [center, setCenter] = useState<LatLng>(new LatLng(-128, 128));

    return (
        <Body>
            <div>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
                    integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
                    crossOrigin="" />

                <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
                    integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
                    crossOrigin=""></script>

                <MapContainer
                    crs={CRS.Simple}
                    center={center}
                    zoom={3}
                    minZoom={3} maxZoom={8}
                    className="Map"
                    maxBounds={bounds}
                    zoomControl={false}>
                    <TileLayer
                        attribution="<a href='https://github.com/Unicor-p/SCS_Map_Tiles'>Unicor-p</a>"
                        url={process.env.PUBLIC_URL + "/SCS_Map_Tiles/ats/latest/Tiles/{z}/{x}/{y}.png"}
                    />
                    <PlayerMarker currentPlacement={currentPlacement} />
                </MapContainer>
            </div >
        </Body>
    );
}
