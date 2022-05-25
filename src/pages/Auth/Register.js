import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { RiLoginCircleLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading/Loading';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';
import SocialLogin from './SocialLogin';
import './auth.css'


const Register = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [createUserWithEmailAndPassword, user, loading, error,] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true});
    const [updateProfile, updating, uerror] = useUpdateProfile(auth);
    const [getUser, setGetUser] = useState('');

    const [token] = useToken(user, getUser);

    let loginErrorMessage;
    const navigate = useNavigate();
    
    useEffect( () => {
        if(token){
            signOut(auth);
            localStorage.removeItem('accessToken');
            navigate('/login');
            toast.success('User created! Login Now', { duration: 2000, position: 'top-right' });
        }
    }, [token, navigate])

    // if error
    if(error || uerror){
        loginErrorMessage = <p className='text-danger text-center mt-4'>{error?.message || uerror?.message}</p>
    }

    // if loading
    if(loading || updating) {return <Loading />}

    // create new user
    const handleRegister = async ({ name, email, password }) => {
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({displayName: name});
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
                                {loginErrorMessage}
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
                            <SocialLogin />
                        </div>
                    </div>

                </Col>
            </Row>
        </Container>
    </div>
    );
};

export default Register;