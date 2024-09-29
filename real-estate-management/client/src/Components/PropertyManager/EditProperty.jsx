import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import propertyService from '../../Services/propertyService';

const EditProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const result = await propertyService.getProperty(id);
      setProperty(result);
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await propertyService.updateProperty(id, property);
      alert('Property updated successfully');
    } catch (error) {
      alert('Error updating property');
    }
  };

  if (!property) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Property</h1>
      <form>
        <input name="name" value={property.name} onChange={handleChange} />
        <input name="location" value={property.location} onChange={handleChange} />
        <input name="price" value={property.price} onChange={handleChange} />
        <textarea name="description" value={property.description} onChange={handleChange}></textarea>
        {/* Add inputs for features, images, videos */}
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default EditProperty;
