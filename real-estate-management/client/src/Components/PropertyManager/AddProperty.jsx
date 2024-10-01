import React, { useState, useEffect } from 'react';
import { getUserById ,createProperty } from '../../API/api' // Keeping this function unchanged as per your setup
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode"; // This is your preferred way of importing

const AddProperty = () => {
  const [property, setProperty] = useState({
    name: '',
    location: '',
    price: '',
    description: '',
    managerId: '',
    features: [],
    images: [],
    videos: [],
  });
  const [managerId, setManagerId]=useState(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      async function fetchUserType() {
        try {
          const decoded = jwtDecode(token); // Decoding the token correctly without changing it
          const response = await getUserById(decoded.id, token); // Assuming userId comes from token
          setProperty({...property, [managerId]: response.id});
          console.log("property:", property);
          
        } catch (error) {
          console.error('Error fetching user type:', error);
        }
      }
      fetchUserType();
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await createProperty(property, token);
      alert('Property added successfully');
    } catch (error) {
      alert('Error adding property');
    }
  };

  return (
    <div>
      <h1>Add Property</h1>
      <form>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />
        <input name="price" placeholder="Price" onChange={handleChange} />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
        {/* Add inputs for features, images, videos */}
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default AddProperty;
