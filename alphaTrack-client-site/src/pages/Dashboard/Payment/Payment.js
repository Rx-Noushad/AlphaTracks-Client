import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe("pk_test_51Mlbp1C7LxzRIxk00xNvcUM2fVrqewTRMQlzAUkczXb6gbQjHt5wwnLFjZEXZbABphMftc0WQ0LEf33FT8USrvK500jL7XJzbS");

// console.log(process.env.REACT_APP_STRIPE_PK);


const Payment = () => {
    const [order, setOrder] = useState({})
    const { orderId } = useParams();

    useEffect(() => {
        fetch(`https://alpha-tracks-server-site-kw9aq2sdn-rx-noushad.vercel.app/order/${orderId}`)
            .then(res => res.json())
            .then(order => setOrder(order))
    }, [orderId]);

    return (
        <div>
            <p className='mt-5'>Please, pay BDT. <strong>{order?.price}</strong> for <strong>{order.bike_name}</strong></p>

            <div className='my-6' style={{ maxWidth: "500px" }}>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        order={order}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;