import React from 'react';
import { Link } from 'react-router';

const JobsCard = ({job}) => {
    const {location, jobType,description,requirements,company_logo, _id} = job
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={company_logo}
            alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Card Title
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          <div className="card-actions">
           {requirements.map((skill,index) =>  <div key={index}  className="badge badge-outline">{skill}</div> )}
          
          </div>
          <div className="card-actions justify-end">
         <Link to={`/jobs/${_id}`} className='btn btn-primary'>Show Details</Link>
          
          </div>
        </div>
      </div>
    );
};

export default JobsCard;