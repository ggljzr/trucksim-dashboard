import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { toast, ToastContainer } from 'react-toastify';

export default function Header() {
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
            </Container>
        </Navbar>
    );
}
