import React, { use } from 'react';
import { Link, useParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';

const ApplyJobs = () => {
    const {id:jobid} = useParams()
    const {user} = useAuth();
    const handleSubmit = e => {
        e.preventDefault();
        const linkedin = e.target.linkedin.value
        const github = e.target.github.value
        const resume = e.target.resume.value
        const application = {
            jobid,
            email: user.email,
            linkedin,
            github, resume
        }

        axios.post('https://node-server-six-mocha.vercel.app/applications',application)
        .then(res => {
             console.log(res.data)
             if(res.data.insertedId)
                toast.success('Application successfully inserted')
        })
        .catch(err => console.log(err))

    }
    return (
        <div>
            <h2>Apply for this job <Link to={`/jobs/${jobid}`}>Details</Link></h2>
            <form onSubmit={handleSubmit}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <label className="label">Linkedin Profile</label>
            <input type="url" name='linkedin' className="input" placeholder="Linkedin page" />

            <label className="label">GitHub Profile</label>
            <input type="url" name='github' className="input" placeholder="GitHub page" />

            <label className="label">Resume</label>
            <input type="url" name='resume' className="input" placeholder="Resume link" />
            <input type="submit" className='btn' value="Submit" />
            </fieldset>
            </form>          
        </div>
    );
};

export default ApplyJobs;