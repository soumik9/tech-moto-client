import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import toast from 'react-hot-toast';

const CheckOutForm = ({ order }) => {

    let navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setclientSecret] = useState('');

    const {total} = order;

    useEffect( () => {
        fetch(`https://tech-moto-9.herokuapp.com/create-payment`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({price: total})
        })
        .then(res => {
            if(res.status === 401 || res.status === 401){
                signOut(auth);
                localStorage.removeItem('accessToken');
                navigate('/login')
                toast.error('Forbidden/Unauthorized access!', { duration: 2000, position: 'top-right', });
            }
            return res.json();
        })
        .then(data => {
            if(data?.clientSecret){
                setclientSecret(data.clientSecret);
            }
        })
    }, [total, navigate]);

    const handlePayment = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) { return; }

        const card = elements.getElement(CardElement);

        if (card === null) { return; }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        setCardError(error?.message || '');

    }

    return (
        <div>
            <form onSubmit={handlePayment}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" className='btn tech-btn mt-3 w-100' disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-danger mt-4 text-center'>{ cardError }</p>
            }
        </div>
    );
};

export default CheckOutForm;