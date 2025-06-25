// src/components/ParcelForm.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import districtsData from "../../public/data/warehouses.json";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// 1. Build a sorted list of unique cities
const cities = Array.from(new Set(districtsData.map((d) => d.city))).sort();

// 2. Map each city → its array of districts (used as "service centers")
const serviceCentersByCity = cities.reduce((acc, city) => {
  acc[city] = districtsData
    .filter((d) => d.city === city)
    .map((d) => d.district)
    .sort();
  return acc;
}, {});

const generateTrackingNumber = () => {
  const now = new Date();

  // Date components (YYMMDD)
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");

  // Time components (HHMMSS)
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  // Random component (4 chars)
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();

  // Format: TRK-YYMMDD-HHMMSS-XXXX
  return `TRK-${year}${month}${day}-${hours}${minutes}${seconds}-${random}`;
};

export default function SendParcel({ currentUserName = "John Doe" }) {
  const [showToast, setShowToast] = useState(false);
  const [costSummary, setCostSummary] = useState({ total: 0, breakdown: [] });
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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
      type: "document",
      senderCity: cities[0],
      senderServiceCenter: serviceCentersByCity[cities[0]][0],
      receiverCity: cities[0],
      receiverServiceCenter: serviceCentersByCity[cities[0]][0],
    },
  });

  // watch fields for conditional logic
  const watchType = watch("type");
  const watchSenderCity = watch("senderCity");
  const watchReceiverCity = watch("receiverCity");

  // whenever city changes, reset its serviceCenter to the first in that list
  useEffect(() => {
    setValue("senderServiceCenter", serviceCentersByCity[watchSenderCity][0]);
  }, [watchSenderCity, control]);

  useEffect(() => {
    setValue(
      "receiverServiceCenter",
      serviceCentersByCity[watchReceiverCity][0]
    );
  }, [watchReceiverCity, control]);

  const calculateCost = (data, autoZone) => {
    const breakdown = [];
    let total = 0;

    // Documents: flat 60/80
    if (data.type === "document") {
      total = autoZone === "within" ? 60 : 80;
      breakdown.push(
        `Document (${
          autoZone === "within" ? "Within City" : "Outside City/District"
        }): ৳${total}`
      );
    }
    // Non-documents
    else {
      const weight = parseFloat(data.weight || 0);

      // Base charge (up to 3kg)
      const baseCharge = autoZone === "within" ? 110 : 150;
      total = baseCharge;
      breakdown.push(`Base charge (up to 3kg): ৳${baseCharge}`);

      // Extra weight charge (for every kg above 3kg)
      if (weight > 3) {
        const extraWeight = weight - 3;
        const extraCharge = extraWeight * 40;
        total += extraCharge;
        breakdown.push(
          `Extra weight (${extraWeight}kg × ৳40/kg): ৳${extraCharge}`
        );
      }

      // Outside city surcharge (applied once if outside)
      if (autoZone === "outside") {
        const surcharge = 40;
        total += surcharge;
        breakdown.push(`Outside City/District surcharge: ৳${surcharge}`);
      }
    }

    return { total, breakdown };
  };

  const onSubmit = (data) => {
    // Determine delivery zone
    const autoZone =
      data.senderCity === data.receiverCity ? "within" : "outside";

    const result = calculateCost(data, autoZone);
    setCostSummary(result.total);

    Swal.fire({
      title: "Cost Breakdown",
      html: `
    <div style="text-align: left; font-size: 15px; line-height: 1.6;">
      <p><strong style="color: #4B5563;">Zone:</strong> 
         <span style="color: #10B981;">${
           autoZone === "within" ? "Within City" : "Outside City/District"
         }</span>
      </p>
      <ul style="padding-left: 20px; margin-bottom: 12px;">
        ${result.breakdown
          .map(
            (line) => `
            <li>
              <span style="color: #6B7280;">•</span> 
              <span style="color: #374151;">${line.replace(
                /(.*:)(.*)/,
                (_, label, value) =>
                  `<span style='color:#6B7280;'>${label}</span><span style='color:#2563EB;'>${value}</span>`
              )}</span>
            </li>`
          )
          .join("")}
      </ul>
      <p style="font-weight: bold; font-size: 16px;">
        <span style="color: #374151;">Total:</span> 
        <span style="color: #EF4444;">৳${result.total.toFixed(2)}</span>
      </p>
    </div>
  `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#EF4444",
    }).then((res) => {
      if (res.isConfirmed) handleConfirm(result.total);
    });
  };

  const handleConfirm = async (total) => {
    const data = getValues();
    const payload = {
      ...data,
      cost: total,
      creation_date: new Date().toISOString(),
      created_by: user?.email,
      delivery_status: "unknown",
      payment_status: "unpaid",
      tracking_id: generateTrackingNumber(),
    };
    console.log(payload);
    try {
      const axiosSecure = useAxiosSecure();
      await axiosSecure.post("/parcels", payload).then((res) => {
        console.log(res.data);
        alert("Parcel saved!");
      });
    } catch (e) {
      console.error(e);
      alert("Error saving parcel");
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
                {...register("type", { required: true })}
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
                {...register("title", { required: true })}
                className="input input-bordered"
                placeholder="Parcel title"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">Required</span>
              )}
            </div>

            {watchType === "non-document" && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Weight (kg)</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("weight", {
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
                  {...register("senderName", { required: true })}
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
                  {...register("senderContact", { required: true })}
                  className="input input-bordered"
                  placeholder="+8801XXXXXXXXX"
                />
                {errors.senderContact && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>
              {/* City */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">City</span>
                </label>
                <select
                  {...register("senderCity", { required: true })}
                  className="select select-bordered"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
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
                  {...register("senderServiceCenter", { required: true })}
                  className="select select-bordered"
                >
                  {serviceCentersByCity[watchSenderCity].map((sc) => (
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
                  {...register("senderAddress", { required: true })}
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
                  {...register("pickupInstruction", { required: true })}
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
                  {...register("receiverName", { required: true })}
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
                  {...register("receiverContact", { required: true })}
                  className="input input-bordered"
                />
                {errors.receiverContact && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>
              {/* City */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">City</span>
                </label>
                <select
                  {...register("receiverCity", { required: true })}
                  className="select select-bordered"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
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
                  {...register("receiverServiceCenter", { required: true })}
                  className="select select-bordered"
                >
                  {serviceCentersByCity[watchReceiverCity].map((sc) => (
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
                  {...register("receiverAddress", { required: true })}
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
                  {...register("deliveryInstruction", { required: true })}
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
    </div>
  );
}
