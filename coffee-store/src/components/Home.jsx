import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import CoffeCard from './CoffeCard';

const Home = () => {
    const initialCoffees = useLoaderData();
    const [coffees, setCoffees] = useState(initialCoffees)
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {
                coffees.map(coffee => <CoffeCard key={coffee._id } coffee={coffee} coffees={coffees} setCoffees={setCoffees} ></CoffeCard>)
            }
      </div>
    );
};

export default Home;