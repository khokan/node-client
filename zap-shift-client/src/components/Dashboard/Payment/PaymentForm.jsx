import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { use, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('')
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();
    const {isPending, data: ParcelInfo={}} = useQuery({
        queryKey: ['parcels', id],
        quueryFn: async() => {
            const res = axiosSecure.get(`/parcels/${id}`);
            return res.data;
        }
    })
    if(isPending)
        return '..Loading'

        console.log(ParcelInfo)

    const handleSubmit = async e => {
        e.preventDefault();
        if(!stripe || !elements)
            return;

        const card = elements.getElement(CardElement)
        if(card == null)
            return;

        const {error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if(error)
            setError(error.message)
        else
            setError('')
            console.log('payment method', paymentMethod)
    }
    return (
        <div>
            <form className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto' onSubmit={handleSubmit}>
                <CardElement className= "p-2 border rounded">

                </CardElement>
             
            <button type='sumit' className='btn btn-primary w-full' disabled={!stripe}>
                    Pay For Parcel Pickup
                </button>  
                {
                    error && <p className='text-red-500'>{error}</p>
                }
                </form>        
        </div>
    );
};

export default PaymentForm;