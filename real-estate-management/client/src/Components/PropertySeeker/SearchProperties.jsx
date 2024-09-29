import React, { useState, useEffect } from 'react';
import propertyService from '../../Services/propertyService';
import PropertyCard from '../Shared/PropertyCard';

const SearchProperties = () => {
  const [properties, setProperties] = useState([]);
  const [searchParams, setSearchParams] = useState({
    location: '',
    priceRange: '',
    type: '',
  });

  useEffect(() => {
    // Fetch all properties or based on search params
    const fetchProperties = async () => {
      const result = await propertyService.getProperties(searchParams);
      setProperties(result);
    };
    fetchProperties();
  }, [searchParams]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  return (
    <div>
      <h1>Search Properties</h1>
      <input name="location" placeholder="Location" onChange={handleSearchChange} />
      <input name="priceRange" placeholder="Price Range" onChange={handleSearchChange} />
      {/* Additional filters */}
      <div>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default SearchProperties;
