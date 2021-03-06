import { signOut } from 'firebase/auth';
import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import OrderRow from './OrderRow';

const MyOrders = () => {

    let navigate = useNavigate();
    const [user] = useAuthState(auth);

    const { data: myOrders, isLoading, refetch } = useQuery('myOrders', () =>
        fetch(`https://tech-moto-9.herokuapp.com/orders/${user?.email}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => {
            if(res.status === 401 || res.status === 401){
                signOut(auth);
                localStorage.removeItem('accessToken');
                navigate('/login')
                toast.error('Forbidden/Unauthorized access!', { duration: 2000, position: 'top-right', });
            }
            return res.json();
        }))

    if (isLoading) { return <Loading /> }

    return (
        <div>
            <div className='card py-3 py-md-5 mb-5'>

                <div className='text-center mb-5' style={{ borderBottom: '1px solid #686DE0' }}>
                    <h3 className='pb-3'>My Orders: {myOrders?.length}</h3>
                </div>

                <Row className='justify-content-center px-3 g-0'>
                    <Col md={12} sm={12}>

                        {
                            !myOrders.length ? <p className='text-danger text-center'>You have no orders</p> : <>

                                <Table responsive className='align-middle'>
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Tool Name</th>
                                            <th>Email</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Payment</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            myOrders.map((myOrder, index) => <OrderRow 
                                                key={myOrder._id}
                                                index={index}
                                                myOrder={myOrder}
                                                refetch={refetch}
                                            />)
                                        }
                                    </tbody>
                                </Table>

                            </>
                        }

                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default MyOrders;