import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Wifi, WifiOff, GeoAlt, Stopwatch } from "react-bootstrap-icons";

import { ToastContainer } from 'react-toastify';

import { dateShortStr, timedelatStr } from '../utils';

interface Props {
    mqttConnected: boolean,
    gameTime: Date,
    // navigation ETA (in minutes)
    navigationTime: number | null,
    // navigation distance (in km)
    navigationDistance: number | null,
}


export default function Header({ mqttConnected, gameTime, navigationTime, navigationDistance }: Props) {
    const iconSize = 24;
    const mqttConnectedIcon = mqttConnected ?
        <Wifi color='green' size={iconSize} />
        :
        <WifiOff color='red' size={iconSize} />;

    return (
        <Navbar bg="light" className="Header">
            <ToastContainer
                position="top-right"
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
                <Navbar.Text>{dateShortStr(gameTime)}</Navbar.Text>
                {(navigationTime === null) ? <></> : <Navbar.Text><Stopwatch />{timedelatStr(navigationTime)}</Navbar.Text>}
                {(navigationDistance === null) ? <></> : <Navbar.Text><GeoAlt /> {navigationDistance.toFixed(0).toString() + ' km'}</Navbar.Text>}
                <Navbar.Text>{mqttConnectedIcon}</Navbar.Text>
            </Container>
        </Navbar>
    );
}
