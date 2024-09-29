import React, { useState } from 'react';
import { registerUser } from '../API/api'; // Adjust the path according to your project structure

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role_id: 2, // Default to seeker
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData); // Call your API function
      setSuccessMessage('User registered successfully!');
    } catch (error) {
      setError(error.message || 'Registration failed');
    }
  };

  return (
    <div className="registration-page">
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <label>Role:</label>
          <div>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
