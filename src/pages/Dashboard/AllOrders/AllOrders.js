import { signOut } from 'firebase/auth';
import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import OrderRow from './OrderRow';

const AllOrders = () => {

    let navigate = useNavigate();

    const { data: orders, isLoading, refetch } = useQuery('allOrders', () =>
        fetch(`https://tech-moto-9.herokuapp.com/orders`,{
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
                    <h3 className='pb-3'>Tools: {orders?.length}</h3>
                </div>

                <Row className='justify-content-center px-3 g-0'>
                    <Col md={12} sm={12}>

                        {
                            !orders.length ? <p className='text-danger text-center'>No orders available</p> : <>

                                <Table responsive className='align-middle'>
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Tool Name</th>
                                            <th>Email</th>
                                            <th>Total</th>
                                            <th>Pay Status</th>
                                            <th>Status</th>
                                            <th>Change Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map((order, index) => <OrderRow
                                                key={order._id}
                                                index={index}
                                                order={order}
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

export default AllOrders;