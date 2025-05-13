import React, { use, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router';


const Users = () => {
   const userData = useLoaderData()
   const [users,setUsers] = useState(userData)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const user = {name,email}
        
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type':'Application/json'
            },
            body: JSON.stringify(user) 
        }).then(res => res.json())
          .then(data => {
             console.log('after creating user in the database', data)
            if(data.insertedId)
            setUsers([...users,{ _id: data.insertedId, name, email }])
            e.target.reset();
        })
    }

    const handleUserDelete = (id) => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE',
        })
            .then(res =>res.json())
            .then(data => {
                console.log(data)
                if(data.deletedCount > 0){
                    const remianing = userData.filter(user => user._id != id)
                    setUsers(remianing)
                }
            })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name"  />
                <br />
                <input type="email" name="email"  />
                <br />
                <input type="submit" value="Add User" />
            </form>

            { 
                users.map(user => 
                <p key={user._id}>{user.name}<br></br>{ user.email} 
                <Link to={`/users/${user._id}`}>Details</Link>
                <Link to={`/update/${user._id}`}>Edit</Link>
                 <button onClick={() => handleUserDelete(user._id)}>X</button></p>
                
            )
            }     
        </div>
    );
};

export default Users;