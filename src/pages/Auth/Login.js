import React, { useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import {FcGoogle} from 'react-icons/fc'
import { RiLoginCircleLine } from 'react-icons/ri'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';
import Loading from '../Shared/Loading/Loading';
import './auth.css'

const Login = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
    const [token] = useToken(user || guser);

    let loginErrorMessage;
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
            toast.success('Welcome to dashboard!', { duration: 2000, position: 'top-right' });
        }
    }, [token, navigate, from])

    // loading
    if (loading || gloading) { return <Loading /> }

    // error checking
    if (error || gerror) {
        loginErrorMessage = <p className='text-danger text-center mt-4'>{error?.message || gerror?.message}</p>
    }

    const handleLogin = ({ email, password }) => {
        signInWithEmailAndPassword(email, password);
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

                            <form onSubmit={handleSubmit(handleLogin)}>

                                <div>
                                    <Form.Label htmlFor="email" className='ps-1'>Email</Form.Label>
                                    <Form.Control type="email" {...register('email', { required: true })} placeholder='Your Email' />
                                    {errors.email && <p className='p-0 text-danger text-center'>Email is required.</p>}
                                </div>

                                <div className='mt-4'>
                                    <Form.Label htmlFor="password" className='ps-1'>Password</Form.Label>
                                    <Form.Control type="password" {...register('password', { required: true })} placeholder='Your Password' />
                                    {errors.password && <p className='p-0 text-danger text-center'>Password is required.</p>}
                                </div>


                                <div className="form__terms d-flex justify-content-center">
                                    <Form.Group className="my-3" id="formGridCheckbox">
                                        <Form.Check inline type="checkbox" id='remember' label="Remember Me" />
                                    </Form.Group>
                                </div>


                                <button className='btn form__btn' type="submit">
                                    Login
                                    <RiLoginCircleLine className='form__btn-icon' />
                                </button>
                            </form>

                            <div className="form__detail mt-3 d-flex justify-content-center">
                                <div>
                                    <p>If you haven't account <Link to="/register">Create account here</Link></p>
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
                                    <button className='w-100 py-3 google-btn' onClick={() => signInWithGoogle()}>
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

export default Login;