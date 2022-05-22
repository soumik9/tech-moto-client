import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth';
import logo  from '../../../assets/logo.jpg'
import auth from '../../../firebase.init';
import './header.css'

const Header = () => {

    const [user] = useAuthState(auth);

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

                    {
                        user ? <button 
                                    type='button' 
                                    className='btn tech-btn'
                                    onClick={ () => signOut(auth) }
                                    >Logout</button> : <Nav.Link as={ Link } to='/login'>Login</Nav.Link>
                    }

                    
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
};

export default Header;