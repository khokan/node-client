import React from 'react';
import Swal from 'sweetalert2';

const AddCoffee = () => {
    const handleAddCoffe = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newCoffee = Object.fromEntries(formData.entries())
        // console.log(newCoffee)

        fetch('https://node-server-six-mocha.vercel.app/coffees', {
            method: 'POST',
            headers: {
                'content-type':'Application/json'
            },
            body: JSON.stringify(newCoffee) 
        }).then(res => res.json())
          .then(data => {            
            if(data.insertedId)
                console.log('after creating user in the database', data)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "data been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
            // setUsers([...users,{ _id: data.insertedId, name, email }])
            form.reset();
        })

    }
    return (
        <div className='p-24 border-2'>
            <div className='p-12 border-2 text-center space-y-4'>
                <h1 className="text-6xl">Add New Co</h1>
                <p>It is a long established fact that a reader will be distraceted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.</p>
            </div>
            <form onSubmit={handleAddCoffe} >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-6'>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Name</label>
                        <input type="text" name='name' className="input w-full" placeholder="Enter coffee name" />                           
                    </fieldset> 
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Quantiy</label>
                        <input type="text" name='quantiy' className="input w-full" placeholder="Enter quantiy name" />                           
                    </fieldset> 
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Supplier</label>
                        <input type="text" name='supplier' className="input w-full" placeholder="Enter supplier name" />                           
                    </fieldset>               
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Taste</label>
                        <input type="text" name='taste' className="input w-full" placeholder="Enter taste name" />                           
                    </fieldset> 
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Price</label>
                        <input type="text" name='price' className="input w-full" placeholder="Enter price name" />                           
                    </fieldset> 
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Details</label>
                        <input type="text" name='details' className="input w-full" placeholder="Enter details name" />                           
                    </fieldset>     
                </div>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 my-6">
                    <label className="label">Photo</label>
                    <input type="text" name='photo' className="input w-full" placeholder="Enter photo" />                           
            </fieldset>  
            <input type="submit" className='btn w-full' value="Add Coffee" />
            </form>       
        </div>
    );
};

export default AddCoffee;