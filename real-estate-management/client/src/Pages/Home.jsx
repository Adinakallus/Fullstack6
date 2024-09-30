import React, { useEffect, useState } from 'react';
//import RegistrationPage from './Pages/Registration';  // Import the Registration page
import { useNavigate } from 'react-router-dom';


function Home() {
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate=useNavigate();


    const handleRegisterClick=()=>{
        navigate('/register');
    }

    const handleLoginClick=()=>{
        navigate('/login');
    }
    return(
        <div>
            <h2>Home</h2>
            <button onClick={handleRegisterClick}>Register</button>
            <button onClick={handleLoginClick}>Login</button>

        </div>
    )
}
export default Home;