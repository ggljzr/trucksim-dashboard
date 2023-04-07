import { LatLng, LatLngBounds, CRS } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet'

import { DPlacement } from '../types';

import InfoWidget from '../components/map/InfoWidget';
import PlayerMarker from '../components/map/PlayerMarker';
import Body from '../components/Body';

import { useGameInfo } from '../contexts/GameInfoProvider';

interface Props {
    currentPlacement: DPlacement | null,
    // navigation ETA (in minutes)
    navigationTime: number | null,
    // navigation distance (in km)
    navigationDistance: number | null,
    // next rest stop in minutes
    nextRestStop: number | null,
    followPosition?: boolean,
}

export default function MapPage({ currentPlacement, navigationTime, navigationDistance, nextRestStop, followPosition }: Props) {
    const { gameInfo } = useGameInfo();

    // different bounds for ETS2?
    const bounds = new LatLngBounds([-0.14083500491548762, 0.15625], [-255.8694486014055, 255.76590296171884]);

    var mapUrl = process.env.PUBLIC_URL + '/SCS_Map_Tiles/ats/latest/Tiles/{z}/{x}/{y}.png';
    if (gameInfo !== null && gameInfo.game_id === 'eut2') {
        mapUrl = process.env.PUBLIC_URL + '/SCS_Map_Tiles/ets2/latest/Tiles/{z}/{x}/{y}.png';
    }

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
                    center={new LatLng(-128, 128)}
                    zoom={3}
                    minZoom={3} maxZoom={8}
                    className="Map"
                    maxBounds={bounds}
                    zoomControl>
                    <TileLayer
                        attribution="<a href='https://github.com/Unicor-p/SCS_Map_Tiles'>Unicor-p</a>"
                        url={mapUrl}
                    />
                    <PlayerMarker currentPlacement={currentPlacement} autoCenter={followPosition} />
                    <InfoWidget navigationTime={navigationTime} navigationDistance={navigationDistance} nextRestStop={nextRestStop} />
                </MapContainer>
            </div >
        </Body>
    );
}
