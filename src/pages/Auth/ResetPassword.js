import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RiLoginCircleLine } from 'react-icons/ri'
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading/Loading';
import toast from 'react-hot-toast';

const ResetPassword = () => {

    let loginErrorMessage;
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

    if(sending){return <Loading />}

    // error checking
    if (error) {
        loginErrorMessage = <p className='text-danger text-center mt-4'>{error?.message}</p>
    }

    const handleReset = async (data) => {
        await sendPasswordResetEmail(data.email);
        reset();
        toast.success('Reset mail send!', { duration: 2000, position: 'top-right' });
    }

    return (
        <div className='auth my-50'>
            <Container>
                <Row className='justify-content-center align-items-center h-100vh'>
                    <Col md={6} lg={5}>

                        <div className="card" >

                            <div className="d-flex justify-content-center mb-4">
                                <div className='text-center'>
                                    <h2 className="form__title ">Login</h2>
                                    {loginErrorMessage}
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(handleReset)}>

                                <div className='mb-4'>
                                    <Form.Label htmlFor="email" className='ps-1'>Email</Form.Label>
                                    <Form.Control type="email" {...register('email', { required: true })} placeholder='Your Email' />
                                    {errors.email && <p className='p-0 text-danger text-center'>Email is required.</p>}
                                </div>

                                <button className='btn form__btn' type="submit">
                                    Reset
                                    <RiLoginCircleLine className='form__btn-icon' />
                                </button>
                            </form>

                            <div className="form__detail mt-3 d-flex justify-content-center">
                                <div>
                                    <p>Already have account <Link to="/login">Login here</Link></p>
                                </div>
                            </div>

                        </div>

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ResetPassword;