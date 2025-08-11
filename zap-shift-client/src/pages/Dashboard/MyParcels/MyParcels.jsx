import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedParcelId, setSelectedParcelId] = useState(null);
    const [selectedGateway, setSelectedGateway] = useState('');

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });

    const handleView = (id) => {
        console.log("View parcel", id);
        // You could open a modal or navigate to a detail page
    };

    const handlePay = (id) => {
        setSelectedParcelId(id);
        setShowPaymentModal(true);
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#e11d48",
            cancelButtonColor: "#6b7280",
        });
        
        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`/parcels/${id}`);
                Swal.fire({
                    title: "Deleted!",
                    text: "Parcel has been deleted.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });
                refetch();
            } catch (err) {
                Swal.fire("Error", err.message || "Failed to delete parcel", "error");
            }
        }
    };

    const proceedToPayment = () => {
        if (!selectedGateway) {
            Swal.fire({
                title: "Oops!",
                text: "Please select a payment gateway",
                icon: "warning",
                timer: 1500,
            });
            return;
        }

        setShowPaymentModal(false);
        if(selectedGateway == 'stripe')
            navigate(`/dashboard/payment/${selectedParcelId}?gateway=${selectedGateway}`);
        else
            navigate(`/dashboard/paymentSSL/${selectedParcelId}?gateway=${selectedGateway}`);       
    };

    const formatDate = (iso) => {
        return new Date(iso).toLocaleString();
    };

    return (
        <div className="overflow-x-auto shadow-md rounded-xl">
            <table className="table table-zebra w-full">
                <thead className="bg-base-200 text-base font-semibold">
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Created At</th>
                        <th>Cost</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel, index) => (
                        <tr key={parcel._id}>
                            <td>{index + 1}</td>
                            <td className="max-w-[180px] truncate">{parcel.title}</td>
                            <td className="capitalize">{parcel.type}</td>
                            <td>{formatDate(parcel.creation_date)}</td>
                            <td>৳{parcel.cost}</td>
                            <td>
                                <span
                                    className={`badge ${parcel.payment_status === "paid"
                                        ? "badge-success"
                                        : "badge-error"
                                        }`}
                                >
                                    {parcel.payment_status}
                                </span>
                            </td>
                            <td className="space-x-2">
                                <button
                                    onClick={() => handleView(parcel._id)}
                                    className="btn btn-xs btn-outline"
                                >
                                    View
                                </button>
                                {parcel.payment_status === "unpaid" && (
                                    <button
                                        onClick={() => handlePay(parcel._id)}
                                        className="btn btn-xs btn-primary text-black"
                                    >
                                        Pay
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(parcel._id)}
                                    className="btn btn-xs btn-error"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {parcels.length === 0 && (
                        <tr>
                            <td colSpan="7" className="text-center text-gray-500 py-6">
                                No parcels found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Payment Gateway Selection Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-4">Select Payment Method</h3>
                            
                            <div className="space-y-4 mb-6">
                                <div 
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedGateway === 'stripe' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                                    onClick={() => setSelectedGateway('stripe')}
                                >
                                    <div className="flex items-center">
                                        <input 
                                            type="radio" 
                                            className="radio radio-primary mr-3"
                                            checked={selectedGateway === 'stripe'}
                                            onChange={() => {}}
                                        />
                                        <div>
                                            <h4 className="font-medium text-lg">Credit/Debit Card</h4>
                                            <p className="text-sm text-gray-600">Pay with Stripe (Visa, MasterCard, etc.)</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div 
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedGateway === 'sslcommerz' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                                    onClick={() => setSelectedGateway('sslcommerz')}
                                >
                                    <div className="flex items-center">
                                        <input 
                                            type="radio" 
                                            className="radio radio-primary mr-3"
                                            checked={selectedGateway === 'sslcommerz'}
                                            onChange={() => {}}
                                        />
                                        <div>
                                            <h4 className="font-medium text-lg">Local Payment</h4>
                                            <p className="text-sm text-gray-600">Pay with SSLCommerz (bKash, Nagad, etc.)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-end space-x-3">
                                <button 
                                    onClick={() => {
                                        setShowPaymentModal(false);
                                        setSelectedGateway('');
                                    }}
                                    className="btn btn-outline btn-sm"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={proceedToPayment}
                                    className="btn btn-primary btn-sm"
                                    disabled={!selectedGateway}
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyParcels;