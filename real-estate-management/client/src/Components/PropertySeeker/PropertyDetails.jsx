import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import propertyService from '../../Services/propertyService';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const result = await propertyService.getProperty(id);
      setProperty(result);
    };
    fetchProperty();
  }, [id]);

  if (!property) return <div>Loading...</div>;

  return (
    <div>
      <h1>{property.name}</h1>
      <p>{property.description}</p>
      <p>{property.location}</p>
      <p>{property.price}</p>
      {/* Add images, features, and media display */}
    </div>
  );
};

export default PropertyDetails;
