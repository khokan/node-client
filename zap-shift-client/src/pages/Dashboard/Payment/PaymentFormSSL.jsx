import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../../components/Loading';


const PaymentFormSSL = () => {
    const { user } = useAuth();
    const { parcelId } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    // Fetch parcel information
    const { data: parcelInfo, isPending, error } = useQuery({
        queryKey: ['parcel', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        },
        retry: 2
    });

    // Initialize payment when component mounts and parcelInfo is available
    useEffect(() => {
        if (!parcelInfo || !parcelInfo._id) return;

        const initializePayment = async () => {
            try {
                const paymentData = {
                    parcelId: parcelInfo._id,
                    amount: parcelInfo.cost,
                    customerName: user?.displayName || 'Customer',
                    customerEmail: user?.email,
                    customerAddress: parcelInfo.address || 'N/A',
                    customerPhone: parcelInfo.phone || 'N/A'
                };

                const res = await axiosSecure.post('/create-ssl-payment', paymentData);
                
                if (res.data) {
                    // Redirect to SSLCommerz payment page
                    window.location.href = res.data;
                } else {
                    throw new Error('Payment gateway URL not received');
                }
            } catch (err) {
                Swal.fire({
                    title: 'Payment Error',
                    text: err.response?.data?.message || err.message || 'Failed to initialize payment',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate(-1); // Go back to previous page
                });
            }
        };

        initializePayment();
    }, [parcelInfo, user, axiosSecure, navigate]);

    if (isPending) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <h3 className="text-xl font-semibold text-red-600">
                    Failed to load parcel information
                </h3>
                <p className="text-gray-600 mt-2">
                    {error.message}
                </p>
                <button 
                    onClick={() => navigate(-1)}
                    className="btn btn-primary mt-4"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Processing Payment</h2>
                <p className="text-lg mb-6">
                    You're being redirected to SSLCommerz payment gateway...
                </p>
                <div className="flex justify-center">
                    <div className="loading loading-spinner loading-lg"></div>
                </div>
                <div className="mt-6">
                    <p className="text-sm text-gray-500">
                        Amount: ৳{parcelInfo?.cost || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Parcel: {parcelInfo?.title || 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentFormSSL;