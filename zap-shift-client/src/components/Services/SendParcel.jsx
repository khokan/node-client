// src/components/ParcelForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import districtsData from '../../public/data/warehouses.json'; // your JSON array

// 1. Build a sorted list of unique regions
const regions = Array.from(
  new Set(districtsData.map((d) => d.region))
).sort();

// 2. Map each region → its array of districts (used as “service centers”)
const serviceCentersByRegion = regions.reduce((acc, region) => {
  acc[region] = districtsData
    .filter((d) => d.region === region)
    .map((d) => d.district)
    .sort();
  return acc;
}, {});

export default function SendParcel({ currentUserName = 'John Doe' }) {
  const [showToast, setShowToast] = useState(false);
  const [calculatedCost, setCalculatedCost] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      senderName: currentUserName,
      type: 'document',
      senderRegion: regions[0],
      senderServiceCenter: serviceCentersByRegion[regions[0]][0],
      receiverRegion: regions[0],
      receiverServiceCenter: serviceCentersByRegion[regions[0]][0],
    },
  });

  // watch fields for conditional logic
  const watchType = watch('type');
  const watchSenderRegion = watch('senderRegion');
  const watchReceiverRegion = watch('receiverRegion');

  // whenever region changes, reset its serviceCenter to the first in that list
  useEffect(() => {
    setValue(
      'senderServiceCenter',
      serviceCentersByRegion[watchSenderRegion][0]
    );
  }, [watchSenderRegion, control]);

  useEffect(() => {
    setValue(
      'receiverServiceCenter',
      serviceCentersByRegion[watchReceiverRegion][0]
    );
  }, [watchReceiverRegion, control]);

  // cost logic
  const calculateCost = (data) => {
    const base = data.type === 'document' ? 5 : 10;
    const weightCharge =
      data.type === 'non-document' && data.weight
        ? parseFloat(data.weight) * 2
        : 0;
    const scCharge =
      (serviceCentersByRegion[data.senderRegion].indexOf(
        data.senderServiceCenter
      ) +
        1) *
      3;
    return base + weightCharge + scCharge;
  };

  const onSubmit = (data) => {
    console.log(data);
    const cost = calculateCost(data);
    setCalculatedCost(cost);
    setShowToast(true);
  };

  const handleConfirm = async () => {
    const data = getValues(); // get all form values
    const payload = {
      ...data,
      cost: calculatedCost,
      creation_date: new Date().toISOString(),
    };
    try {
      await axios.post('/api/parcels', payload);
      setShowToast(false);
      alert('Parcel saved!');
    } catch (e) {
      console.error(e);
      alert('Error saving parcel');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <div className="card bg-base-100 shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Parcel Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Type</span>
              </label>
              <select
                {...register('type', { required: true })}
                className="select select-bordered"
              >
                <option value="document">Document</option>
                <option value="non-document">Non-Document</option>
              </select>
              {errors.type && (
                <span className="text-red-500 text-sm">Required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                {...register('title', { required: true })}
                className="input input-bordered"
                placeholder="Parcel title"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">Required</span>
              )}
            </div>

            {watchType === 'non-document' && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Weight (kg)</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register('weight', {
                    valueAsNumber: true,
                  })}
                  className="input input-bordered"
                  placeholder="e.g. 2.5"
                />
              </div>
            )}
          </div>
        </div>

        {/* Sender & Receiver */}
        <div className="flex items-center justify-start gap-6">
          {/* Sender */}
          <div className="card bg-base-100 shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Sender Info</h2>
            <div className="space-y-4">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  {...register('senderName', { required: true })}
                  className="input input-bordered"
                />
                {errors.senderName && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>
              {/* Contact */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contact</span>
                </label>
                <input
                  type="tel"
                  {...register('senderContact', { required: true })}
                  className="input input-bordered"
                  placeholder="+8801XXXXXXXXX"
                />
                {errors.senderContact && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>
              {/* Region */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Region</span>
                </label>
                <select
                  {...register('senderRegion', { required: true })}
                  className="select select-bordered"
                >
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              {/* Service Center */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Service Center</span>
                </label>
                <select
                  {...register('senderServiceCenter', { required: true })}
                  className="select select-bordered"
                >
                  {serviceCentersByRegion[watchSenderRegion].map((sc) => (
                    <option key={sc} value={sc}>
                      {sc}
                    </option>
                  ))}
                </select>
              </div>
              {/* Address */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <textarea
                  {...register('senderAddress', { required: true })}
                  className="textarea textarea-bordered"
                  rows={2}
                />
                {errors.senderAddress && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>
              {/* Pick-up Instruction */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Pick-up Instruction</span>
                </label>
                <textarea
                  {...register('pickupInstruction', { required: true })}
                  className="textarea textarea-bordered"
                  rows={2}
                />
                {errors.pickupInstruction && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>
            </div>
          </div>

          {/* Receiver */}
          <div className="card bg-base-100 shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Receiver Info</h2>
            <div className="space-y-4">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  {...register('receiverName', { required: true })}
                  className="input input-bordered"
                />
                {errors.receiverName && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>
              {/* Contact */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contact</span>
                </label>
                <input
                  type="tel"
                  {...register('receiverContact', { required: true })}
                  className="input input-bordered"
                />
                {errors.receiverContact && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>
              {/* Region */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Region</span>
                </label>
                <select
                  {...register('receiverRegion', { required: true })}
                  className="select select-bordered"
                >
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              {/* Service Center */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Service Center</span>
                </label>
                <select
                  {...register('receiverServiceCenter', { required: true })}
                  className="select select-bordered"
                >
                  {serviceCentersByRegion[watchReceiverRegion].map((sc) => (
                    <option key={sc} value={sc}>
                      {sc}
                    </option>
                  ))}
                </select>
              </div>
              {/* Address */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <textarea
                  {...register('receiverAddress', { required: true })}
                  className="textarea textarea-bordered"
                  rows={2}
                />
                {errors.receiverAddress && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>
              {/* Delivery Instruction */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Delivery Instruction</span>
                </label>
                <textarea
                  {...register('deliveryInstruction', { required: true })}
                  className="textarea textarea-bordered"
                  rows={2}
                />
                {errors.deliveryInstruction && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

      {/* Cost & Confirm Toast */}
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-info shadow-lg">
            <div>
              <span>Delivery cost: ${calculatedCost.toFixed(2)}</span>
            </div>
            <div className="flex-none">
              <button
                onClick={handleConfirm}
                className="btn btn-sm btn-success"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
