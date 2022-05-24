import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import OrderRow from './OrderRow';

const MyOrders = () => {

    const [user] = useAuthState(auth);

    const { data: myOrders, isLoading, refetch } = useQuery('myOrders', () =>
        fetch(`https://tech-moto-9.herokuapp.com/orders/${user?.email}`)
            .then(res => res.json()))

    if (isLoading) { return <Loading /> }



    return (
        <div>
            <div className='card py-3 py-md-5 mb-5'>

                <div className='text-center mb-5' style={{ borderBottom: '1px solid #686DE0' }}>
                    <h3 className='pb-3'>My Orders: {myOrders?.length}</h3>
                </div>

                <Row className='justify-content-center px-3'>
                    <Col md={12} sm={12}>

                        {
                            !myOrders ? <p className='text-danger'>You have no orders</p> : <>

                                <Table responsive className='align-middle'>
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Tool Name</th>
                                            <th>Email</th>
                                            <th>Total</th>
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