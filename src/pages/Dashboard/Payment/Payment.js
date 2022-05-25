import React from 'react';
import { signOut } from 'firebase/auth';
import { Card, Col, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import toast from 'react-hot-toast';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe('pk_test_51L0j9AGllMoN5o7HOO5UP7g2ynWBYo6G7mQ0UkCow6eFHW2Cc9PGLwcUhdVlft1rD3CWf5SjOQCniUm4YWw50fJQ00aFDtxuHb');

const Payment = () => {

    let {orderId} = useParams();
    let navigate = useNavigate();

    const { data: order, isLoading } = useQuery('payOrder', () =>
        fetch(`https://tech-moto-9.herokuapp.com/order/${orderId}`, {
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
        <div className='card py-3 py-md-5 mb-5'>

        <div className='text-center mb-5' style={{ borderBottom: '1px solid #686DE0' }}>
            <h3 className='pb-3'>Hello, <span className='tech-title'>{order.userName}</span></h3>
            <div className='d-flex justify-content-center'>
                <div><p className='me-3'>Pay for: <span className='tech-title'>{orderId}</span></p></div>
                <div><p>Email: <span className='tech-title'>{order.email}</span></p></div>
            </div>
            <div className='d-flex justify-content-center'>
                <div><p className='me-3'>Order Quantity: <span className='tech-title'>{order.quantity}</span></p></div>
                <div><p>Tool Name: <span className='tech-title'>{order.toolName}</span></p></div>
            </div>
            <div className='d-flex justify-content-center'>
                <div><p className='me-3'>Address: <span className='tech-title'>{order.address}</span></p></div>
                <div><p>Mobile: <span className='tech-title'>{order.mobile}</span></p></div>
            </div>
        </div>

        <Row className='justify-content-center g-0'>
            <Col md={4} sm={10}>
                <Card className='py-4 px-2'>
                    <p className='text-center tech-title mb-4'>Please pay: { order.total } $</p>
                    <Elements stripe={stripePromise}>
                        <CheckOutForm order={order} />
                    </Elements>
                </Card>
            </Col>
        </Row>
    </div>
    );
};

export default Payment;