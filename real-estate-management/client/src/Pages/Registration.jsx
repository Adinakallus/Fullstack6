import React, { useState } from 'react';
import { registerUser } from '../API/api'; // Adjust the path according to your project structure
import '../CSS/RegistrationPage.css'; // Import the CSS file for styling

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role_id: 2, // Default to seeker
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleToggle = () => {
    setFormData((prevData) => ({
      ...prevData,
      role_id: prevData.role_id === 1 ? 2 : 1, // Toggle between manager (1) and seeker (2)
    }));
  };

  const validatePasswordStrength = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    } else {
      setConfirmPasswordError('');
    }

    if (!validatePasswordStrength(formData.password)) {
      setPasswordError('Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.');
      return;
    } else {
      setPasswordError('');
    }

    try {
      const response = await registerUser(formData); // Call your API function
      setSuccessMessage('User registered successfully!');
      setError('');
    } catch (error) {
      setError(error.message || 'Registration failed');
    }
  };

  return (
    <div className="registration-page">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {passwordError && <p className="error-message">{passwordError}</p>} {/* Password strength message */}
        </div>
        
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>} {/* Password mismatch message */}
        </div>

        <div className="form-group">
          <label>Role:</label>
          <div className="role-toggle">
            <label>
              <input
                type="radio"
                name="role"
                checked={formData.role_id === 1}
                onChange={handleRoleToggle}
              />
              Manager
            </label>
            <label>
              <input
                type="radio"
                name="role"
                checked={formData.role_id === 2}
                onChange={handleRoleToggle}
              />
              Seeker
            </label>
          </div>
        </div>
        
        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
