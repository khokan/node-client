import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useTrackingLogger from '../../../hooks/useTrackingLogger';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying');
    const [payment, setPayment] = useState(null);
    const [error, setError] = useState(null);
    const axiosSecure = useAxiosSecure();
    const { logTracking } = useTrackingLogger();

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates after unmount

    const verifyPayment = async () => {
        try {
            // 1. Extract and validate parameters
            const params = Object.fromEntries([...searchParams]);
            const { tran_id, val_id, parcel_id } = params;
            
            if (!tran_id || !parcel_id) {
                throw new Error('Transaction ID or Parcel ID missing');
            }

            // 2. Parallelize independent operations
            const [parcelRes, verificationRes] = await Promise.all([
                axiosSecure.get(`/parcels/${parcel_id}`),
                axiosSecure.post('/verify-payment', { tran_id, val_id })
            ]);

            if (!verificationRes.data.success) {
                throw new Error(verificationRes.data.message || 'Payment verification failed');
            }

            const parcelInfo = parcelRes.data;
            const payment = verificationRes.data.payment;

            console.log('parcelInfo', parcelInfo);
            if (!isMounted) return;

            // 3. Prepare and send payment data
            const paymentData = {
                parcelId: parcel_id,
                email: parcelInfo.created_by,
                amount: parcelInfo.cost,
                transactionId: tran_id,
                paymentMethod: payment.card_type
            };

            const paymentRes = await axiosSecure.post('/payments', paymentData);
            
            if (!paymentRes.data.insertedId) {
                throw new Error('Failed to save payment record');
            }

            // 4. Update state and show success
            setStatus('success');
            setPayment(payment);

            await Swal.fire({
                icon: 'success',
                title: 'Payment Successful!',
                html: `<strong>Transaction ID:</strong> <code>${tran_id}</code>`,
                confirmButtonText: 'Go to My Parcels',
            });

            // 5. Log tracking and redirect
            await logTracking({
                tracking_id: parcelInfo.tracking_id,
                status: "payment_done",
                details: `Paid by ${parcelInfo.sender_name}`,
                updated_by: parcelInfo.created_by,
            });

            navigate('/dashboard/myParcels');

        } catch (err) {
            if (!isMounted) return;
            
            console.error('Verification error:', err);
            setStatus('failed');
            setError(err.message);
            
            await Swal.fire({
                icon: 'error',
                title: 'Payment Failed',
                text: err.message,
            });
        }
    };

    verifyPayment();

    return () => { isMounted = false; }; // Cleanup function
}, [searchParams, axiosSecure, navigate]); // Added missing dependencies

    


    const renderContent = () => {
        switch (status) {
            case 'verifying':
                return (
                    <div className="text-center p-8">
                        <BeatLoader color="#36d7b7" size={15} />
                        <h2 className="text-xl font-semibold mt-4">Verifying Payment</h2>
                        <p>Please wait while we confirm your transaction</p>
                    </div>
                );
            
            case 'success':
                return (
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
                        {payment && (
                            <div className="mb-6 text-black">
                                <p>Amount: ৳{payment.amount}</p>
                                <p>Transaction ID: {payment.tran_id}</p>
                                <p>Payment Method: {payment.card_type}</p>
                            </div>
                        )}
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                );
            
            case 'failed':
                return (
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => navigate('/payment')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => navigate('/support')}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Contact Support
                            </button>
                        </div>
                    </div>
                );
            
            default:
                return null;
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md overflow-hidden">
            {renderContent()}
        </div>
    );
};

export default PaymentSuccess;