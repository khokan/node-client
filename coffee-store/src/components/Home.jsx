import React from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import CoffeCard from './CoffeCard';

const Home = () => {
    const coffees = useLoaderData();
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {
                coffees.map(coffee => <CoffeCard key={coffee._id } coffee={coffee}></CoffeCard>)
            }
      </div>
    );
};

export default Home;