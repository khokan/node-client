import { FirebaseError } from "firebase/app";
import { object } from "motion/react-client";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const AddJob = () => {
  const { user } = useAuth();
  const handleAddJob = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const { min, max, currency, ...newJob } = data;
    newJob.salaryRange = {
      min,
      max,
      currency,
    };
    const cleanRequirement = newJob.requirements
      .split(",")
      .map((req) => req.trim(req));
    newJob.requirements = cleanRequirement;
    const cleanResposibility = newJob.responsibilities
      .split(",")
      .map((req) => req.trim(req));
    newJob.responsibilities = cleanResposibility;
    newJob.status = "active";

    axios
      .post(`${import.meta.env.VITE_NODE_SERVER_URL}/jobs`, newJob)
      .then((data) => {
        if (data.data.insertedId) {
          console.log(data.data);
        }
      })
      .catch((err) => console.log(err));
    console.log(Object.keys(newJob).length);
  };
  return (
    <div>
      <form onSubmit={handleAddJob}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Basic Info</legend>

          <label className="label">Title</label>
          <input
            type="text"
            name="title"
            className="input"
            placeholder="Title"
          />

          <label className="label">Company</label>
          <input
            type="text"
            name="company"
            className="input"
            placeholder="Company"
          />

          <label className="label">Company Logo</label>
          <input
            type="url"
            name="company_logo"
            className="input"
            placeholder="Company Logo"
          />
          <label className="label">Location</label>
          <input
            type="text"
            name="location"
            className="input"
            placeholder="Location"
          />
        </fieldset>
        {/* Job Type */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Job Type</legend>
          <div className="filter">
            <input
              className="btn filter-reset"
              type="radio"
              name="jobType"
              aria-label="All"
            />
            <input
              className="btn"
              type="radio"
              name="jobType"
              aria-label="On-Site"
            />
            <input
              className="btn"
              type="radio"
              name="jobType"
              aria-label="Hybrid"
            />
            <input
              className="btn"
              type="radio"
              name="jobType"
              aria-label="Remote"
            />
          </div>
        </fieldset>
        {/* Job Category */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Job Category</legend>
          <div className="filter"></div>
          <select
            name="category"
            defaultValue="Job Category"
            className="select"
          >
            <option disabled={true}>Job Category</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Sales</option>
          </select>
        </fieldset>
        {/* Application deadline */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Application deadline</legend>
          <input type="date" name="applicationDeadline" className="input" />
        </fieldset>
        {/*Salary Range */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Salary Range</legend>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div>
              <label className="label">Min Salary</label>
              <input
                type="number"
                name="min"
                className="input"
                placeholder="Minimum Salary"
              />
            </div>

            <div>
              <label className="label">Max Salary</label>
              <input
                type="number"
                name="max"
                className="input"
                placeholder="Maximun Salary"
              />
            </div>

            <div>
              <label className="label">Currency</label>
              <select
                name="currency"
                defaultValue="Select Currency"
                className="select"
              >
                <option disabled={true}>Select Currency</option>
                <option>BDT</option>
                <option>USD</option>
                <option>URO</option>
              </select>
            </div>
          </div>
        </fieldset>
        {/* Job Description */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Job Description</legend>
          <textarea
            className="textarea"
            name="description"
            placeholder="Job Description"
          ></textarea>
        </fieldset>
        {/* Job Requitements */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Job Requitements</legend>
          <textarea
            className="textarea"
            name="requirements"
            placeholder="Job Requitements"
          ></textarea>
        </fieldset>
        {/* Job Responsibilities */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Job Responsibilities</legend>
          <textarea
            className="textarea"
            name="responsibilities"
            placeholder="Job Responsibilities"
          ></textarea>
        </fieldset>
        {/* HR info */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">HR Info</legend>

          <label className="label">Name</label>
          <input
            type="text"
            name="hr_name"
            className="input"
            placeholder="Title"
          />

          <label className="label">email</label>
          <input
            type="text"
            name="hr_email"
            className="input"
            defaultValue={user?.email}
            placeholder="Company"
          />
        </fieldset>
        <input type="submit" className="btn" value="Submit" />
      </form>
    </div>
  );
};

export default AddJob;
