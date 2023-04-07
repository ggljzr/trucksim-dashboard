import { useState, useEffect } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import mqtt from "mqtt/dist/mqtt";

import { toast } from 'react-toastify';

import { useGameInfo } from './contexts/GameInfoProvider';

import Header from './components/Header';
import Loading from './components/Loading';

import MapPage from './pages/MapPage';
import JobPage from './pages/JobPage';
import TruckPage from './pages/TruckPage';
import SettingsPage from './pages/SettingsPage';

import { Job, Truck, Value, DPlacement, GameInfo } from './types';

import { decodePayload, minutesToDate } from './utils';

/**
 * Main dashboard component, containing MQTT client and dashboard pages.
 * 
 * Main purpose for this component is that it can work inside the GameInfoProvider context,
 * initialized in App.tsx. This context is necessary to set correct game string (e. g. 'ats' or 'eut2').
 */
export default function Dashboard() {
    const { gameInfo, setGameInfo } = useGameInfo();

    const [mqttConnected, setMqttConnected] = useState(false);

    const [gameTime, setGameTime] = useState(minutesToDate(0));
    // next rest stop in minutes
    const [nextRestStop, setNextRestStop] = useState<number | null>(null);

    // ETA in minutes
    const [navigationTime, setNavigationTime] = useState<number | null>(null);
    const [navigationDistance, setNavigationDistance] = useState<number | null>(null);

    const [job, setJob] = useState<Job | null>(null);
    const [truck, setTruck] = useState<Truck | null>(null);

    const [currentPlacement, setCurrentPlacement] = useState<DPlacement | null>(null);

    useEffect(() => {
        console.log(process.env.REACT_APP_MQTT_BROKER_URL);
        const client = mqtt.connect(process.env.REACT_APP_MQTT_BROKER_URL as string);
        client.on('connect', () => setMqttConnected(true));

        client.on('message', (topic, payload, packet) => {
            switch (topic) {
                case "trucksim/gameinfo":
                    setGameInfo(decodePayload<GameInfo | null>(payload));
                    break;
                case 'trucksim/event/config/job':
                    setJob(decodePayload<Job>(payload));
                    break;
                case 'trucksim/event/config/truck':
                    setTruck(decodePayload<Truck>(payload));
                    break;
                case 'trucksim/channel/game/time':
                    // we recieved game time since the 00:00 of the first day in minutes
                    // we need to convert it to milliseconds
                    const t = minutesToDate(decodePayload<Value>(payload).value);
                    setGameTime(t);
                    break;
                case 'trucksim/channel/rest/stop':
                    setNextRestStop(decodePayload<Value>(payload).value);
                    break;
                case 'trucksim/channel/truck/world/placement':
                    setCurrentPlacement(decodePayload<DPlacement>(payload));
                    break;
                case 'trucksim/channel/truck/navigation/time':
                    // trucksim/channel/truck/navigation/time is in seconds, we want minutes for consistency
                    setNavigationTime(decodePayload<Value>(payload).value / 60);
                    break;
                case 'trucksim/channel/truck/navigation/distance':
                    // trucksim/channel/truck/navigation/distance is in meters, we want km
                    setNavigationDistance(decodePayload<Value>(payload).value / 1000);
                    break;
            }
        });

        client.subscribe('trucksim/gameinfo');

        client.subscribe('trucksim/event/config/job');
        client.subscribe('trucksim/event/config/truck');

        client.subscribe('trucksim/channel/game/time');
        client.subscribe('trucksim/channel/rest/stop');

        client.subscribe('trucksim/channel/truck/world/placement');
        client.subscribe('trucksim/channel/truck/navigation/time');
        client.subscribe('trucksim/channel/truck/navigation/distance');
    }, []);

    useEffect(() => {
        if (nextRestStop && nextRestStop === 240) toast.warning('Next rest stop in 4 hours');
        if (nextRestStop && nextRestStop === 120) toast.warning('Next rest stop in 2 hours');
    }, [nextRestStop]);

    useEffect(() => {
        if (job !== null) {
            toast.info(`New job: ${job.source_city} - ${job.destination_city}`);
        }
    }, [job]);

    useEffect(() => {
        if (truck !== null) {
            toast.info(`New truck selected: ${truck.brand} ${truck.name}`);
        }
    }, [truck]);

    return (
        // wait for game string before displaying dashboard
        (gameInfo === null) ?
            <Loading mqttConnected={mqttConnected} />
            :
            <BrowserRouter>
                <Header mqttConnected={mqttConnected}
                    gameTime={gameTime}
                    navigationTime={navigationTime}
                    navigationDistance={navigationDistance}
                />

                <Routes>
                    <Route path="/" element={<Navigate to="/map" />} />
                    <Route path="/map" element={<MapPage
                        currentPlacement={currentPlacement}
                        navigationDistance={navigationDistance}
                        navigationTime={navigationTime}
                        nextRestStop={nextRestStop}
                        followPosition />} />
                    <Route path="/job" element={<JobPage job={job} nextRestStop={nextRestStop} />} />
                    <Route path="/truck" element={<TruckPage truck={truck} />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>

            </BrowserRouter>
    );
}
