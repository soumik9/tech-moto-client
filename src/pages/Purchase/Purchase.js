import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { RiLoginCircleLine } from 'react-icons/ri'
import auth from '../../firebase.init';
import Loading from '../Shared/Loading/Loading';
import Quantity from './Quantity';
import './purchase.css'

const Purchase = () => {

   
    const { toolId } = useParams();
    const [user] = useAuthState(auth);
    const { register, handleSubmit, formState: { errors }, } = useForm();

    

    const { data: tool, isLoading } = useQuery('tool', () =>
        fetch(`https://tech-moto-9.herokuapp.com/tool/${toolId}`)
        .then(res => res.json()))

    // if data is loading
    if (isLoading) { return <Loading /> }

    const { name, img, price, quantity, minimum, description } = tool;

    // if(minimum){ setOrderQuantity(minimum)}

    //console.log(orderQuantity);

    const handlePurchase = () => {
        console.log('ok');
    }


    return (
        <section className='purchase my-100'>
            <Container>
                <Row className='justify-content-between'>
                    <Col lg={6} md={6}>
                        <div className='info text-md-start'>
                            <div className="tool-img text-center mb-5">
                                <img className='img-fluid w-50' src={img} alt={name} />
                                <p className='mb-4'>{description}</p>
                            </div>
                            <div class="mb-3 row">
                                <p class="col-7 col-md-7 col-lg-8">Tool Name</p>
                                <p class="col-5 col-md-5 col-lg-4">: <span className='tech-title'>{name}</span></p>
                            </div>
                            <div class="mb-3 row">
                                <p class="col-7 col-md-8">Price</p>
                                <p class="col-5 col-md-4">: <span className='tech-title'>{price} $</span></p>
                            </div>
                            <div class="mb-3 row">
                                <p class="col-7 col-md-8">Minimum Order Quantity</p>
                                <p class="col-5 col-md-4">: <span className='tech-title'>{minimum} pc</span></p>
                            </div>
                            <div class="mb-3 row">
                                <p class="col-7 col-md-8">Available Quantity</p>
                                <p class="col-5 col-md-4">: <span className='tech-title'>{quantity} pc</span></p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={5} md={6}>
                        <div className="user__info mt-5 mt-md-0">
                            <div class="mb-3 row">
                                <p class="col-3 col-md-4 col-lg-5"><small>User Email</small></p>
                                <p class="col-9 col-md-8 col-lg-7">: <span className='tech-title'>{user.displayName}</span></p>
                            </div>
                            <div class="mb-3 row">
                                <p class="col-3 col-md-3 col-lg-5"><small>User Email</small></p>
                                <p class="col-9 col-md-9 col-lg-7">: <span className='tech-title'>{user.email}</span></p>
                            </div>

                            {/* quantiy */}
                            <Quantity
                                minimum={minimum}
                                quantity={quantity}
                             />


                            <form onSubmit={handleSubmit(handlePurchase)} className='mt-5'>

                                {/* <div>
                                    <Form.Label htmlFor="orderQuantity" className='ps-1'>Quantiy</Form.Label>
                                    <Form.Control type="text" {...register('orderQuantity', { required: {
                                            value: true,
                                            message: 'Order quantity is required.'
                                        }, minLength: {
                                            value: {minimum}, 
                                            message: `Order should be minimum ${minimum} pc`
                                        }, 
                                        maxLength: {
                                            value: {quantity}, 
                                            message: `Order should be maximum ${quantity} pc`
                                        }
                                    })} value={minimum} />
                                     {errors.orderQuantity?.type === 'required' && <p className='text-error mt-1 text-center'>{errors.password.message}</p>}
                                    {errors.orderQuantity?.type === 'minLength' && <p className='text-error mt-1 text-center'>{errors.password.message}</p>}
                                    {errors.orderQuantity?.type === 'maxLength' && <p className='text-error mt-1 text-center'>{errors.password.message}</p>}
                                </div> */}

                                <div className='mt-4'>
                                    <Form.Label htmlFor="address" className='ps-1'>Address</Form.Label>
                                    <Form.Control type="text" as='textarea' {...register('address', { required: true })} placeholder='Your address' />
                                    {errors.address && <p className='p-0 text-danger text-center'>Address is required.</p>}
                                </div>

                                <div className='my-4'>
                                    <Form.Label htmlFor="mobile" className='ps-1'>Mobile</Form.Label>
                                    <Form.Control type="number" {...register('mobile', { required: true })} placeholder='Your mobile number' />
                                    {errors.mobile && <p className='p-0 text-danger text-center'>Mobile number is required.</p>}
                                </div>

                                <Button className='tech-btn w-100 py-2' type="submit">
                                    Place Order <RiLoginCircleLine className='icon-p' />
                                </Button>

                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Purchase;