import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth';
import logo from '../../../assets/logo.jpg'
import auth from '../../../firebase.init';
// import Loading from '../Loading/Loading';
import './header.css'

const Header = () => {

    const [user] = useAuthState(auth);

    const handleLogout = () =>{
        signOut(auth);
        localStorage.removeItem('accessToken');
    }

    return (
        <Navbar expand="lg">
            <Container>

                <Navbar.Brand as={Link} to='/'>
                    <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />
                    {' '}
                    Tech Moto
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to='/'>Home</Nav.Link>
                        <Nav.Link as={Link} to='/tools'>Tools</Nav.Link>
                        <Nav.Link as={Link} to='/about'>About Us</Nav.Link>
                        <Nav.Link as={Link} to='/team'>Our Team</Nav.Link>
                        <Nav.Link as={Link} to='/portfolio'>My Portfolio</Nav.Link>
                        <Nav.Link href='#contact'>Contact Us</Nav.Link>

                        {
                            user ? ( <>
                            <Nav.Link as={Link} to='/dashboard'>Dashboard</Nav.Link>
                            <Nav.Link as={Link} to='/portfolio'>{ user?.displayName }</Nav.Link>
                            <button
                                type='button'
                                className='btn tech-btn'
                                onClick={handleLogout}
                            >Logout</button> </>) : <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                        }


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;