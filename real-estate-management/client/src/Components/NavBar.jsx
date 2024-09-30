import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Import the user icon
import '../CSS/NavBar.css'; // Import the CSS file

const NavigationBar = () => {
  const [userType, setUserType] = useState(null);
  const [username, setUsername] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      async function fetchUserType() {
        try {
          const response = await getUser(token);
          const role_id = response.role_id;
          setUsername(response.name); // Assuming the response has a name field
          if (role_id === 1) {
            setUserType('property_manager');
          } else if (role_id === 2) {
            setUserType('property_seeker');
          }
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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="left-container">
        <h1 className="logo">HomeQuest</h1>
        <Link to="/" className="home-link">Home</Link>
      </div>
      <div className="nav-links">
        {token && userType === 'property_manager' && (
          <div className="nav-item">
            <Link to="/add-property" className="link">Add Property</Link>
          </div>
        )}
        <div className="nav-item">
          <div className="user-container" onClick={toggleDropdown}>
            <FaUserCircle className="user-icon" />
            {dropdownOpen && (
              <div className="dropdown">
                {!token ? (
                  <>
                    <Link to="/login" className="dropdown-link">Login</Link>
                    <Link to="/register" className="dropdown-link">Register</Link>
                  </>
                ) : (
                  <>
                    <p className="dropdown-text">Welcome, {username}!</p>
                    <Link to="/update-profile" className="dropdown-link">Update Profile</Link>
                    <button onClick={handleLogout} className="dropdown-link">Logout</button>
                    <button onClick={() => navigate('/delete-account')} className="dropdown-link">Delete Account</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
