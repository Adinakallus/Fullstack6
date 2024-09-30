import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../API/api'; // Import necessary API functions
import { jwtDecode } from "jwt-decode";
import '../CSS/UpdateUser.css'; // Import the CSS file

const UpdateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(''); 
  const [passwordStrengthError, setPasswordStrengthError] = useState(''); 
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true); // Loading state for data fetch
  const [userId, setUserId] = useState(null); // Store userId in state
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError('No valid session found, please log in.');
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token); // Decode the token
      setUserId(decoded.id); // Set userId in state
    } catch (decodeError) {
      setError('Invalid token, please log in again.');
      localStorage.removeItem('token');
      navigate('/login');
      return;
    }
  }, [token, navigate]); // This effect only sets userId from the token

  useEffect(() => {
    // Only fetch user data once userId is set
    if (userId) {
      async function fetchUserData() {
        try {
          const response = await getUserById(userId, token); // Fetch user data by ID
          setFormData({
            name: response.name || '', 
            email: response.email || '',
            password: '', 
            confirmPassword: '',
          });
          setLoading(false); // Data is fetched, no longer loading
        } catch (error) {
          setError('Failed to fetch user data');
          setLoading(false); // Stop loading even if there’s an error
        }
      }

      fetchUserData();
    }
  }, [userId, token]); // Fetch user data when userId is updated

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors when the user is typing
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
      setPasswordStrengthError('');
    }
  };

  // Password strength checker
  const validatePasswordStrength = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handlePasswordBlur = () => {
    if (formData.password && !validatePasswordStrength(formData.password)) {
      setPasswordStrengthError(
        'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.'
      );
    } else {
      setPasswordStrengthError('');
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final check before submitting if passwords match and strength is good
    if (formData.password && formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    if (formData.password && !validatePasswordStrength(formData.password)) {
      setPasswordStrengthError(
        'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.'
      );
      return;
    }

    try {
      await updateUser(userId, formData, token); // Call updateUser API using userId from state
      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  if (loading) {
    return <div>Loading user data...</div>; // Show loading state while fetching user data
  }

  return (
    <div className="update-user-container">
      <h2>Update Profile</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handlePasswordBlur} 
            placeholder="Leave empty to keep current password"
          />
          {passwordStrengthError && <p className="error-message">{passwordStrengthError}</p>}
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onBlur={handleConfirmPasswordBlur} 
            placeholder="Confirm your password"
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <button type="submit" className="update-button">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateUser;
