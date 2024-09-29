import React, { useState, useEffect } from 'react';
import propertyService from '../../Services/propertyService';
import PropertyCard from '../Shared/PropertyCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const result = await propertyService.getFavorites();
      setFavorites(result);
    };
    fetchFavorites();
  }, []);

  return (
    <div>
      <h1>Your Favorite Properties</h1>
      {favorites.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default Favorites;
