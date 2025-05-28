import React from 'react';
import JobsCard from './JobsCard';


const HotJobs = ({jobs}) => {
    return (
        <>        
        <h2>{jobs.length}</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>          
            {jobs.map(job => <JobsCard key={job._id} job={job}/>  
            )}
        </div>
        </>
    );
};

export default HotJobs;