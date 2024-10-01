import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserById } from '../API/api'; // Keeping this function unchanged as per your setup
import {jwtDecode} from "jwt-decode"; // This is your preferred way of importing
import '../CSS/Navbar.css'; // Importing CSS for styling

const NavigationBar = () => {
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState(''); 
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      async function fetchUserType() {
        try {
          const decoded = jwtDecode(token); // Decoding the token correctly without changing it
          const response = await getUserById(decoded.id, token); // Assuming userId comes from token
          setUserType(response.role_id === 1 ? 'property_manager' : 'property_seeker');
          setUserName(response.name);
        } catch (error) {
          console.error('Error fetching user type:', error);
        }
      }
      fetchUserType();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="left-container">
        <div className="logo">HomeQuest</div>
        <Link to="/" className="home-link">Home</Link>
        {userType === 'property_manager' && (
          <Link to="/manager/add-property" className="home-link add-property-btn">Add Property</Link> /* AddProperty button */
        )}
      </div>
      <div className="right-container">
        {!token ? (
          <>
            <Link to="/register" className="link">Register</Link>
            <Link to="/login" className="link">Login</Link>
          </>
        ) : (
          <>
            <div className="user-container">
              <span className="user-icon">👤</span>
              <div className="dropdown">
              <span className="welcome-message">Welcome, {userName}!</span> {/* Welcome message added */}
                <Link to="/update-profile" className="dropdown-link">Update User</Link>
                <Link to="/delete-account" className="dropdown-link">Delete Account</Link>
                <button onClick={handleLogout} className="dropdown-link">Logout</button>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
