import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Wifi, WifiOff } from "react-bootstrap-icons";


import { ToastContainer } from 'react-toastify';

interface Props {
    mqttConnected: boolean,
}


export default function Header({ mqttConnected }: Props) {
    const iconSize = 24;
    const mqttConnectedIcon = mqttConnected ?
        <Wifi color='green' size={iconSize} />
        :
        <WifiOff color='red' size={iconSize} />;

    return (
        <Navbar bg="light" className="Header">
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
            />
            <Container fluid>
                <Navbar.Brand>Trucksim dashboard</Navbar.Brand>
                {mqttConnectedIcon}
            </Container>
        </Navbar>
    );
}
