import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const NavigationBar = () => {
  const [userType, setUserType] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      async function fetchUserType() {
        try {
          const response = await getUser(token);
          const role_id=response.role_id;
          if(role_id==1){
            setUserType('property_manager'); 
          }
          if(role_id==2){
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

  return (
    <nav style={styles.navbar}>
      <div style={styles.navItem}>
        <Link to="/" style={styles.link}>Home</Link>
      </div>
      <div style={styles.navLinks}>
        {!token && (
          <>
            <div style={styles.navItem}>
              <Link to="/register" style={styles.link}>Register</Link>
            </div>
            <div style={styles.navItem}>
              <Link to="/login" style={styles.link}>Login</Link>
            </div>
          </>
        )}
        {token && (
          <>
            <div style={styles.navItem}>
              <Link to="/profile" style={styles.link}>Profile</Link>
            </div>
            {userType === 'admin' && (
              <div style={styles.navItem}>
                <Link to="/admin-dashboard" style={styles.link}>Manage Shows</Link>
              </div>
            )}
             {userType === 'show_admin' && (
              <div style={styles.navItem}>
                <Link to="/admin-dashboard" style={styles.link}>Manage Shows</Link>
              </div>
            )}
            <div style={styles.navItem}>
              <button onClick={handleLogout} style={styles.button}>Logout</button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      background: 'linear-gradient(90deg, #007acc 0%, #00c851 100%)', // שילוב של כחול וטורקיז
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    navItem: {
      margin: '0 1rem',
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '18px',
      padding: '0.5rem 1rem',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      borderRadius: '5px',
      margin: '0 0.5rem',
      background: '#1e90ff', 
    },
    linkHover: {
      backgroundColor: '#00bfa5', 
    },
    button: {
      backgroundColor: '#ff5722', 
      color: '#fff',
      border: 'none',
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      borderRadius: '25px',
      transition: 'background-color 0.3s ease',
      margin: '0 0.5rem',
    },
    buttonHover: {
      backgroundColor: '#e64a19',
    },
  };
  
  

export default NavigationBar;