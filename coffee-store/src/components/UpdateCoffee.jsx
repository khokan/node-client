import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateCoffee = () => {
    const userData = useLoaderData();
    const {_id, name, quantiy, price,photo, taste, supplier, details} = userData;

    const handleUpdateCoffe = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newCoffee = Object.fromEntries(formData.entries())
        console.log(newCoffee,_id)
        fetch(`http://localhost:5000/coffees/${_id}`, {
          method: "PUT",
          headers: {
            "content-type": "Application/json",
          },
          body: JSON.stringify(newCoffee),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) 
            console.log('after modified',data);
          });
    }
    return (
        <div className='p-24 border-2'>
        <div className='p-12 border-2 text-center space-y-4'>
            <h1 className="text-6xl">Update Coffee</h1>    
        </div>
        <form onSubmit={handleUpdateCoffe} >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-6'>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                    <label className="label">Name</label>
                    <input type="text" name='name' className="input w-full" defaultValue={name} placeholder="Enter coffee name" />                           
                </fieldset> 
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                    <label className="label">Quantiy</label>
                    <input type="text" name='quantiy' className="input w-full" defaultValue={quantiy} placeholder="Enter quantiy name" />                           
                </fieldset> 
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                    <label className="label">Supplier</label>
                    <input type="text" name='supplier' className="input w-full" defaultValue={supplier} placeholder="Enter supplier name" />                           
                </fieldset>               
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                    <label className="label">Taste</label>
                    <input type="text" name='taste' className="input w-full" defaultValue={taste} placeholder="Enter taste name" />                           
                </fieldset> 
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                    <label className="label">Price</label>
                    <input type="text" name='price' className="input w-full" defaultValue={price} placeholder="Enter price name" />                           
                </fieldset> 
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                    <label className="label">Details</label>
                    <input type="text" name='details' className="input w-full" defaultValue={details} placeholder="Enter details name" />                           
                </fieldset>     
            </div>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 my-6">
                <label className="label">Photo</label>
                <input type="text" name='photo' className="input w-full" defaultValue={photo} placeholder="Enter photo" />                           
        </fieldset>  
        <input type="submit" className='btn w-full' value="Update Coffee" />
        </form>       
    </div>
    );
};

export default UpdateCoffee;