import React, { useEffect } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import {FcGoogle} from 'react-icons/fc'
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';

const SocialLogin = () => {

    const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
    const [token] = useToken(guser);

    let loginErrorMessage;
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    useEffect( () => {
        if(token){
            navigate(from, { replace: true });
            toast.success('User created!', { duration: 2000, position: 'top-right' });
        }
    }, [token, navigate, from])

     // if error
     if(gerror){
        loginErrorMessage = <p className='text-danger text-center mt-4'>{gerror?.message}</p>
    }

    // if loading
    if(gloading) {return (
        <Row className='justify-content-center align-items-center' style={{ height: '15vh' }}>
            <Spinner animation="border" variant="info" />
        </Row>
    )}

    return (
        <div>
            {loginErrorMessage}
            <button className='w-100 py-3 google-btn' onClick={() => signInWithGoogle()}>
                <FcGoogle className='form__socials-icon google__icon me-2' /> Google Sign In
            </button>
        </div>
    );
};

export default SocialLogin;