import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Wifi, WifiOff } from "react-bootstrap-icons";


import { ToastContainer } from 'react-toastify';

interface Props {
    mqttConnected: boolean,
    gameTime: Date,
}


export default function Header({ mqttConnected, gameTime }: Props) {
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
                <Navbar.Brand>{gameTime.toLocaleTimeString("en", { timeZone: 'UTC', hour: "2-digit", minute: "2-digit" })}</Navbar.Brand>
                {mqttConnectedIcon}
            </Container>
        </Navbar>
    );
}
