import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Wifi, WifiOff, GeoAlt, Stopwatch, Speedometer } from "react-bootstrap-icons";

import { ToastContainer } from 'react-toastify';

import { useGameInfo } from '../contexts/GameInfoProvider';
import { dateShortStr, etaStr } from '../utils';

interface Props {
    mqttConnected: boolean,
    // navigation ETA (in minutes)
    navigationTime: number | null,
    // navigation distance (in km)
    navigationDistance: number | null,
    // cruise control speed in km/h
    cruiseControlSpeed: number,
}

/**
 * Dashboard header component, used to display basic game info.
 */
export default function Header({
    mqttConnected,
    navigationTime,
    navigationDistance,
    cruiseControlSpeed }: Props) {

    const gameInfo = useGameInfo();

    const iconSize = 24;
    const mqttConnectedIcon = mqttConnected ?
        <Wifi color='orange' size={iconSize} />
        :
        <WifiOff color='orange' size={iconSize} />;

    return (
        <Navbar className="Header">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
            />
            <Container fluid>
                <Navbar.Text>{dateShortStr(gameInfo.gameTime)}</Navbar.Text>
                {(navigationTime === null) ? <></> : <Navbar.Text><Stopwatch /> {etaStr(gameInfo.gameTime, navigationTime)}</Navbar.Text>}
                {(navigationDistance === null) ? <></> : <Navbar.Text><GeoAlt /> {navigationDistance.toFixed(0).toString() + ' km'}</Navbar.Text>}
                {(cruiseControlSpeed === 0) ? <></> : <Navbar.Text><Speedometer /> {cruiseControlSpeed.toFixed(0).toString() + ' km/h'}</Navbar.Text>}
                <Navbar.Text className='ml-3'>{mqttConnectedIcon}</Navbar.Text>
            </Container>
        </Navbar>
    );
}
