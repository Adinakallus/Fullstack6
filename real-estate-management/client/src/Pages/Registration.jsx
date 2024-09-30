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

    // Clear password error when user starts typing a valid password
    if (name === 'password' && validatePasswordStrength(value)) {
      setPasswordError('');
    }

    // Clear confirm password error when passwords match
    if (name === 'confirmPassword' && value === formData.password) {
      setConfirmPasswordError('');
    }
  };

  // Validate confirm password on blur
  const handleConfirmPasswordBlur = () => {
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
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

  // Validate password strength on blur
  const handlePasswordBlur = () => {
    if (!validatePasswordStrength(formData.password)) {
      setPasswordError('Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    if (!validatePasswordStrength(formData.password)) {
      setPasswordError('Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.');
      return;
    }

    try {
      const response = await registerUser(formData); // Call your API function
      setSuccessMessage('User registered successfully!');
      setError('');

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role_id: 2, // Reset role to seeker
      });
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
            onBlur={handlePasswordBlur} 
            required
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onBlur={handleConfirmPasswordBlur} 
            required
          />
          {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
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
