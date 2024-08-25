import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PropertyManagement = () => {
    const [properties, setProperties] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        price: '',
        description: '',
        manager_id: '',
        features: [],
        images: [],
        videos: [],
        audios: []
    });
    const [selectedPropertyId, setSelectedPropertyId] = useState(null);

    useEffect(() => {
        // Fetch all properties on component mount
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get('http://localhost:3000/properties');
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddProperty = async () => {
        try {
            await axios.post('http://localhost:3000/properties', formData);
            fetchProperties(); // Refresh the list after adding
        } catch (error) {
            console.error('Error adding property:', error);
        }
    };

    const handleUpdateProperty = async () => {
        if (!selectedPropertyId) return;
        try {
            await axios.put(`http://localhost:3000/properties/${selectedPropertyId}`, formData);
            fetchProperties(); // Refresh the list after updating
        } catch (error) {
            console.error('Error updating property:', error);
        }
    };

    const handleDeleteProperty = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/properties/${id}`);
            fetchProperties(); // Refresh the list after deleting
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    return (
        <div>
            <h1>Property Management</h1>

            <div>
                <h2>Add Property</h2>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                <input type="text" name="manager_id" value={formData.manager_id} onChange={handleChange} placeholder="Manager ID" />
                <button onClick={handleAddProperty}>Add Property</button>
            </div>

            <div>
                <h2>Update Property</h2>
                <select onChange={(e) => setSelectedPropertyId(e.target.value)}>
                    <option value="">Select Property</option>
                    {properties.map((property) => (
                        <option key={property.id} value={property.id}>{property.name}</option>
                    ))}
                </select>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                <input type="text" name="manager_id" value={formData.manager_id} onChange={handleChange} placeholder="Manager ID" />
                <button onClick={handleUpdateProperty}>Update Property</button>
            </div>

            <div>
                <h2>Delete Property</h2>
                {properties.map((property) => (
                    <div key={property.id}>
                        <span>{property.name}</span>
                        <button onClick={() => handleDeleteProperty(property.id)}>Delete</button>
                    </div>
                ))}
            </div>

            <div>
                <h2>Properties List</h2>
                {properties.map((property) => (
                    <div key={property.id}>
                        <h3>{property.name}</h3>
                        <p>Location: {property.location}</p>
                        <p>Price: {property.price}</p>
                        <p>Description: {property.description}</p>
                        <p>Manager ID: {property.manager_id}</p>
                        {/* Display features, images, videos, audios here */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyManagement;
