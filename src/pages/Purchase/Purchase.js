import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { RiLoginCircleLine } from 'react-icons/ri'
import axios from 'axios';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading/Loading';
import Quantity from './Quantity';
import './purchase.css'
import toast from 'react-hot-toast';

const Purchase = () => {

    const { toolId } = useParams();
    const [user] = useAuthState(auth);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [orderQuantity, setOrderQuantity] = useState();
    const [newOrderQuantity, setnewOrderQuantity] = useState();

    const { data: tool, isLoading, refetch } = useQuery('tool', () =>
        fetch(`https://tech-moto-9.herokuapp.com/tool/${toolId}`)
        .then(res => res.json()))

    // if data is loading
    if (isLoading) { return <Loading /> }

    const { _id, name, img, price, quantity, minimum, description, sold } = tool;

    let total = newOrderQuantity ? newOrderQuantity * price : minimum * price;

    const handlePurchase = async (data) => {
        const { email, userName, address, mobile, status, isPaid } = data;
        const newQuantity = newOrderQuantity ? quantity - newOrderQuantity : quantity - minimum;
        const newSold = newOrderQuantity ? sold + newOrderQuantity : sold + minimum;

        // order data
        const order = {
            email: email, userName: userName, toolName: name,
            toolId: _id, total: total,
            quantity: newOrderQuantity ? newOrderQuantity : minimum,
            address: address, mobile: mobile, status: status, isPaid: isPaid
        };

        // new quantity
        const newToolQuantuty = { newQuantity: newQuantity, newSold: newSold }

        await axios.post(`https://tech-moto-9.herokuapp.com/add-order`, order)
            .then(response => {
                if (response.data.insertedId) {
                    toast.success(`Order for ${name} successfully done`, { duration: 2000, position: 'top-right', });
                    setnewOrderQuantity(0);
                    refetch();
                    reset();

                    const updateQuantity = async (toolId) => {
                        await axios.put(`https://tech-moto-9.herokuapp.com/update-tool/${toolId}`, newToolQuantuty)
                        .then(response => {
                            console.log(response);
                            if (response.data.modifiedCount) {
                                toast.success(`Tool quantity updated`, { duration: 2000, position: 'top-right', });
                                refetch();
                            } else {
                                toast.error('Failed to update quantity!', { duration: 2000, position: 'top-right', });
                            }
                        });
                    }

                    updateQuantity(_id);

                } else {
                    toast.error('Failed to order!', { duration: 2000, position: 'top-right', });
                }
            });
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
                                orderQuantity={orderQuantity}
                                setOrderQuantity={setOrderQuantity}
                                newOrderQuantity={newOrderQuantity}
                                setnewOrderQuantity={setnewOrderQuantity}
                            />


                            <form onSubmit={handleSubmit(handlePurchase)} className='mt-5'>

                                <input type="hidden" value={user?.email} {...register('email')} />
                                <input type="hidden" value={user?.displayName} {...register('userName')} />
                                <input type="hidden" value="pending" {...register('status')} />
                                <input type="hidden" value="false" {...register('isPaid')} />

                                <div className='mt-4'>
                                    <Form.Label htmlFor="total" className='ps-1'>Total Price</Form.Label>
                                    <Form.Control type="text" disabled {...register('total')} value={total} />
                                </div>
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

                                <Button className='tech-btn w-100 py-2' type="submit" disabled={quantity < minimum}>
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