import React from 'react';

const PropertyCard = ({ property }) => {
  return (
    <div>
      <h2>{property.name}</h2>
      <p>{property.location}</p>
      <p>{property.price}</p>
      <p>{property.description}</p>
      {/* Add media and features display */}
    </div>
  );
};

export default PropertyCard;
