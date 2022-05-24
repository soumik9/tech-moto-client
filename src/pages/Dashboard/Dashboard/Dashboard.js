import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import './dashboard.css'

const Dashboard = () => {

    return (
        <div className='row'>
            <div className="col-md-2 col-4">
                <div className={`py-2 py-md-4 ps-md-3 ps-2 pt-3 pt-md-5 bg-dark text-white`} style={{ height: '100%' }}>

                    <div className='text-md-center text-start '>
                        <span>Tech Moto</span>
                    </div>

                    <ul className='ps-0 ps-md-3 py-5'>
                        <li className='mb-4'><Link className='text-white' to='/dashboard'>Dashborad</Link></li>
                        <li className='mb-4'><Link className='text-white' to='/dashboard/my-orders'>My Orders</Link></li>
                        <li className='mb-4'><Link className='text-white' to='/dashboard/add-review'>Add Review</Link></li>
                        <li className='mb-4'><Link className='text-white' to='/dashboard/profile'>My Profile</Link></li>
                    </ul>

                </div>
            </div>
            <div className="col-md-10 col-8">
                <Container>
                    <Row>
                        <Col>
                            <div className="contents__container mt-4">
                                <div className='card text-center py-2 mb-5'>
                                    <h1 className='tech-title'>Welcome to dashboard</h1>
                                </div>
                                {/* contents */}
                                <Outlet />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Dashboard;