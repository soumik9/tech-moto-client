import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import auth from '../../../firebase.init';
import toast from 'react-hot-toast';

const CheckOutForm = ({ order }) => {

    let navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setclientSecret] = useState('');

    const {_id, total, userName, email} = order;

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
        setSuccess('');
        setProcessing(true);

        // confirm card payment
        const {paymentIntent, error: intentError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: userName,
                  email: email
                },
              },
            },
          );

        if(intentError){
            setCardError(intentError?.message);
            setProcessing(false);
        }else{
            setCardError('');
            setTransactionId(paymentIntent.id);
            setSuccess('Congrats, Your Payment completed!');

            // store payment data to backend
            const updateOrder = {
                tool: _id, 
                transactionId: paymentIntent.id
            }

            fetch(`https://tech-moto-9.herokuapp.com/order/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(updateOrder)
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
                setProcessing(false);
            })
        } 
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
            {
                success && <div>
                    <p className='text-success mt-4 text-center'>{ success }</p>
                    <p className='text-info mt-4 text-center'>Transaction id: { transactionId }</p>
                    </div>
            }
        </div>
    );
};

export default CheckOutForm;