import React from "react";

const AddJob = () => {
  return (
    <div>
      <form>
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
          <select defaultValue="Job Category" className="select">
            <option disabled={true}>Job Category</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Sales</option>
          </select>
        </fieldset>
      </form>
    </div>
  );
};

export default AddJob;
