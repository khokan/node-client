import React from 'react';
import { Link, useLoaderData } from 'react-router';

const JobDetails = () => {
    const jobDetails = useLoaderData()
    const {company, title, _id} = jobDetails
    return (
        <div>
            <h2>{company}</h2>
            <p>{title}</p>
            <Link to={`/jobApply/${_id}`}>
            <button className='btn'>Apply Now</button>
            </Link>
        </div>
    );
};

export default JobDetails;