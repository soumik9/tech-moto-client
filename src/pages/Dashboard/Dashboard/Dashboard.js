import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../../firebase.init';
import useAdmin from '../../../hooks/useAdmin';
import useUser from '../../../hooks/useUser';
import Loading from '../../Shared/Loading/Loading';

const Dashboard = () => {

    const [user] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);
    const [userRole, userLoading] = useUser(user);

    if(adminLoading || userLoading){ return <Loading />}

    return (
        <div className='row g-0'>
            <div className="col-md-2 col-4">
                <div className={`py-2 py-md-4 ps-md-3 ps-2 pt-3 pt-md-5 bg-dark text-white`} style={{ height: '100%' }}>

                    <div className='text-md-center text-start '>
                        <span>Tech Moto</span>
                    </div>

                    <ul className='ps-0 ps-md-2 py-5'>

                        <li className='mb-4'><Link className='text-white' to='/dashboard'>Dashborad</Link></li>

                        {/* user */}
                        {
                            userRole && <>
                              
                                <li className='mb-4'><Link className='text-white' to='/dashboard/my-orders'>My Orders</Link></li>
                                <li className='mb-4'><Link className='text-white' to='/dashboard/add-review'>Add Review</Link></li>
                            </>
                        }
                        
                        {/* admin */}
                        {admin &&  <>
                            <li className='mb-4'><Link className='text-white' to='/dashboard/all-orders'>All Orders</Link></li>
                            <li className='mb-4'><Link className='text-white' to='/dashboard/add-tool'>Add Tool</Link></li>
                            <li className='mb-4'><Link className='text-white' to='/dashboard/tools'>Manage Tools</Link></li>
                            <li className='mb-4'><Link className='text-white' to='/dashboard/make-admin'>Make Admin</Link></li>
                        </>}
                       

                        <li className='mb-4'><Link className='text-white' to='/dashboard/profile'>My Profile</Link></li>
                    </ul>

                </div>
            </div>

            <div className="col-md-10 col-8">
                <Container className='px-3'>
                    <Row className='g-0'>
                        <Col sm={12}>
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