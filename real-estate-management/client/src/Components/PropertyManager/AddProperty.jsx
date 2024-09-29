import React, { useState } from 'react';
import propertyService from '../../Services/propertyService';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await propertyService.addProperty(property);
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
