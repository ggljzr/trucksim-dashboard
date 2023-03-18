import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from 'react-router-dom';

import { Compass, Sliders } from "react-bootstrap-icons";

export default function Sidebar() {
    const iconSize = 32;

    return (
        <Navbar sticky="top" className="flex-column Sidebar">
            <Nav.Item>
                <Nav.Link as={NavLink} to="/advisor">
                    <Compass size={iconSize} />
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/settings" >
                    <Sliders size={iconSize} />
                </Nav.Link>
            </Nav.Item>
        </Navbar>
    );
}
