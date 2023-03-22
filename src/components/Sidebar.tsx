import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from 'react-router-dom';

import { Compass, Sliders, Truck, Journal, Person } from "react-bootstrap-icons";

export default function Sidebar() {
    const iconSize = 32;

    return (
        <Navbar sticky="top" bg='light' className="flex-column Sidebar">
            <Nav.Item>
                <Nav.Link as={NavLink} to="/map">
                    <Compass size={iconSize} />
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/job" >
                    <Journal size={iconSize} />
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/truck" >
                    <Truck size={iconSize} />
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/driver" >
                    <Person size={iconSize} />
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
