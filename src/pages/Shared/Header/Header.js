import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo  from '../../../assets/logo.jpg'
import './header.css'

const Header = () => {
    return (
        <Navbar expand="lg">
        <Container>

            <Navbar.Brand href="#home">
                <img alt="" src={logo} width="30" height="30"  className="d-inline-block align-top" />
                {' '}
                Tech Moto
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link as={ Link } to='/'>Home</Nav.Link>
                    <Nav.Link as={ Link } to='/'>About</Nav.Link>
                    <Nav.Link as={ Link } to='/'>Contact</Nav.Link>
                    <Nav.Link as={ Link } to='/login'>Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
};

export default Header;