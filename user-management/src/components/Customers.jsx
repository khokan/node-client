import React, { use, useEffect, useState } from 'react';


const Customers = () => {
    const [data,setData] = useState([])

    useEffect(() => {
        const fetchPromise = fetch('https://node-server-six-mocha.vercel.app/customers')
                    .then(res => res.json()
                     .then(data => setData(data)))
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const customer = {name,email}
        
        fetch('https://node-server-six-mocha.vercel.app/customers', {
            method: 'POST',
            headers: {
                'content-type':'Application/json'
            },
            body: JSON.stringify(customer) 
        }).then(res => res.json()).then(data => console.log(data))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name"  />
                <br />
                <input type="email" name="email"  />
                <br />
                <input type="submit" value="Add Customer" />
            </form>

            { 
                data.map(user => <p key={user.id}>{user.name}<br></br>{ user.email} </p>)
            }     
        </div>
    );
};

export default Customers;