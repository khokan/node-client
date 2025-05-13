import React from 'react';
import { useLoaderData } from 'react-router';

const UserDetails = () => {
    const userData = useLoaderData()
    console.log(userData)
    return (
        <div>

        </div>
    );
};

export default UserDetails;