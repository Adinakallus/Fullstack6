// src/Properties.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Properties = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:3000/properties');
                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    return (
        <div>
            <h1>Properties</h1>
            {properties.map((property) => (
                <div key={property.id}>
                    <h2>{property.name}</h2>
                    <p>Location: {property.location}</p>
                    <p>Price: ${property.price}</p>
                    <p>Description: {property.description}</p>
                    <div>
                        <h3>Features:</h3>
                        <ul>
                            {property.features && property.features.map((feature, index) => (
                                <li key={index}>{feature.name}: {feature.value}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Images:</h3>
                        <div>
                            {property.images && property.images.map((image, index) => (
                                <img key={index} src={`/uploads/images/${image.path}`} alt={`Property ${property.id}`} />
                            ))}
                        </div>
                    </div>
                    {/* Similarly, display videos and audios if needed */}
                </div>
            ))}
        </div>
    );
};

export default Properties;
