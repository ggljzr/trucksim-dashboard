import { useState } from 'react';

import { LatLng, LatLngBounds, CRS } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

import Form from 'react-bootstrap/Form';

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
    // speed limit in km/h
    speedLimit: number,
}

/**
 * Page displaying navigation map.
 */
export default function MapPage({
    currentPlacement,
    navigationTime,
    navigationDistance,
    nextRestStop,
    speedLimit }: Props) {

    const { gameInfo } = useGameInfo();
    const [followPosition, setFollowPosition] = useState(true);

    const bounds = new LatLngBounds([0, 0], [-256, 256]);

    var mapUrl = process.env.PUBLIC_URL + '/SCS_Map_Tiles/ats/latest/Tiles/{z}/{x}/{y}.png';
    if (gameInfo !== null && gameInfo.game_id === 'eut2') {
        mapUrl = process.env.PUBLIC_URL + '/SCS_Map_Tiles/ets2/latest/Tiles/{z}/{x}/{y}.png';
    }

    const toggleFollowPosition = () => {
        setFollowPosition(!followPosition);
    }

    // widget containing switch for following player position
    const followPositionControl = (
        <div className='leaflet-bottom leaflet-left'>
            <div className="leaflet-control">
                <Form>
                    <Form.Check
                        checked={followPosition}
                        type="switch"
                        onChange={toggleFollowPosition}
                        className='FollowPositionSwitch'
                    />
                    Follow truck
                </Form>
            </div>
        </div>
    )

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
                    zoom={5}
                    minZoom={3} maxZoom={8}
                    className="Map"
                    maxBounds={bounds}
                    zoomControl>
                    <TileLayer
                        attribution="<a href='https://github.com/Unicor-p/SCS_Map_Tiles'>Unicor-p</a>"
                        url={mapUrl}
                    />
                    <PlayerMarker currentPlacement={currentPlacement} autoCenter={followPosition} />
                    <InfoWidget
                        navigationTime={navigationTime}
                        navigationDistance={navigationDistance}
                        nextRestStop={nextRestStop}
                        speedLimit={speedLimit}
                    />
                    {followPositionControl}
                </MapContainer>
            </div >
        </Body>
    );
}
