import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import {FcGoogle} from 'react-icons/fc'
import { RiLoginCircleLine } from 'react-icons/ri'
import { Link } from 'react-router-dom';
import './auth.css'

const Register = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm();

    const handleRegister = () => {

    }

    return (
        <div className='auth my-50'>
        <Container>
            <Row className='justify-content-center align-items-center h-100vh'>
                <Col md={6} lg={5}>

                    <div className="card" >

                        <div className="d-flex justify-content-center mb-4">
                            <div className='text-center'>
                                <h2 className="form__title ">Register</h2>
                                {/* {loginErrorMessage} */}
                            </div>
                        </div>


                        <form onSubmit={handleSubmit(handleRegister)}>

                            <div className='mb-3'>
                                <Form.Label htmlFor="name" className='ps-1'>Name</Form.Label>
                                <Form.Control type="text" {...register('name', { required: true })} placeholder='Your Name' />
                                {errors.name && <p className='p-0 text-danger text-center'>Name is required.</p>}
                            </div>

                            <div className='mb-3'>
                                <Form.Label htmlFor="email" className='ps-1'>Email</Form.Label>
                                <Form.Control type="email" {...register('email', { required: true })} placeholder='Your Email' />
                                {errors.email && <p className='p-0 text-danger text-center'>Email is required.</p>}
                            </div>

                            <div className=''>
                                <Form.Label htmlFor="password" className='ps-1'>Password</Form.Label>
                                <Form.Control type="password" {...register('password', { 
                                        required: "Password field is required.", 
                                        validate: { passLength: (value) => value.length > 5 } 
                                    })}
                                placeholder='Your Password' />
                                {errors.password && <p className='p-0 text-danger text-center'>{errors.password.message} </p>}
                                {errors.password && errors.password.type === "passLength" && <p className='p-0 text-danger text-center'>Password length is less than six.</p>}
                            </div>

                            <button className='btn form__btn mt-4' type="submit">
                                Register
                                <RiLoginCircleLine className='form__btn-icon' />
                            </button>
                        </form>

                        <div className="form__detail mt-3 d-flex justify-content-center">
                            <div>
                                <p>Already have account <Link to="/login">Login here</Link></p>
                            </div>
                        </div>

                        <div className="form__or d-flex">
                            <div className='w-100 form__or-hr'><hr /></div>
                            <div className='mx-2 mt-1 or'>OR</div>
                            <div className='w-100 form__or-hr'><hr /></div>
                        </div>

                        {/* social login components */}
                        <div className="form__socials mt-4">
                            <div>
                                <button className='w-100 py-3 google-btn'>
                                    <FcGoogle className='form__socials-icon google__icon me-2' /> Google Sign In
                                </button>
                            </div>
                        </div>
                    </div>

                </Col>
            </Row>
        </Container>
    </div>
    );
};

export default Register;