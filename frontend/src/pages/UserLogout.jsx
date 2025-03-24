// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const UserLogout = () => {
//     const token = localStorage.getItem('token');
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!token) {
//             navigate('/login'); // If no token, redirect to login
//             return;
//         }

//         axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         .then((response) => {
//             if (response.status === 200) {
//                 localStorage.removeItem('token');
//                 navigate('/login');
//             }
//         })
//         .catch((error) => {
//             console.error("Logout Error:", error.response?.data || error.message);
//         });
//     }, [navigate, token]);

//     return <div>Logout</div>;
// };

// export default UserLogout;










//  this code is working fine


import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const UserLogout = () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
            localStorage.removeItem('token')
            navigate('/login')
        }
    })

  return (
    <div>UserLogout</div>
  )
}

export default UserLogout