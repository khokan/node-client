
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh')
//4242 4242 4242 4242 02/56 424 44242
const Payment = () => {
    return (
        <div>
            <h2>Payment</h2>
            <Elements stripe={stripePromise}>
                <PaymentForm/>
            </Elements>
        </div>
    );
};

export default Payment;