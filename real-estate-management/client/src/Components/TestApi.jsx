import React, { useState } from 'react';
import {
    registerUser,
    loginUser,
    getAllUsers,
    createProperty,
    getAllProperties,
    getFullPropertyById,
    addOrUpdateFeature,
    deleteFeature,
    addImage,
    deleteImage,
    addVideo,
    deleteVideo,
    updateProperty,
    deleteProperty,
    getAllFullProperties,
    updateUser,
    deleteUser,
} from '../API/api';  // Assuming your API file is in the same directory

const TestAPI = () => {
    const [result, setResult] = useState(null);

    const testAPI = async () => {
        try {
            // Run the API tests sequentially
            const registerResponse = await registerUser({
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'password123',
                role_id: 1
            });
            console.log('Register Response:', registerResponse);

            const loginResponse = await loginUser({
                email: 'testuser@example.com',
                password: 'password123',
            });
            console.log('Login Response:', loginResponse);

            const token = loginResponse.token;
            localStorage.setItem('token', token);

            const usersResponse = await getAllUsers(token);
            console.log('All Users Response:', usersResponse);

            const createPropertyResponse = await createProperty({
                name: 'Test Property',
                location: 'Test City',
                price: 150000,
                description: 'A beautiful test property',
            }, token);
            console.log('Create Property Response:', createPropertyResponse);

            const propertyId = createPropertyResponse.id;

            const allPropertiesResponse = await getAllProperties();
            console.log('All Properties Response:', allPropertiesResponse);

            const fullPropertyResponse = await getFullPropertyById(propertyId);
            console.log('Full Property Response:', fullPropertyResponse);

            const addFeatureResponse = await addOrUpdateFeature(propertyId, {
                property_id: propertyId,
                feature_name: 'Pool',
                feature_value: 'Yes',
            }, token);
            console.log('Add Feature Response:', addFeatureResponse);

            const featureId = addFeatureResponse.feature_id;
            const deleteFeatureResponse = await deleteFeature(propertyId, featureId, token);
            console.log('Delete Feature Response:', deleteFeatureResponse);

            const addImageResponse = await addImage(propertyId, {
                propertyId:4,
                image_path: 'https://example.com/sample-image.jpg',
            }, token);
            console.log('Add Image Response:', addImageResponse.id);

            const imageId = addImageResponse.id;
            const deleteImageResponse = await deleteImage(imageId, token);
            console.log('Delete Image Response:', deleteImageResponse);

            const addVideoResponse = await addVideo(propertyId, {
                propertyId:4,
                video_path: 'https://example.com/sample-video.mp4',
            }, token);
            console.log('Add Video Response:', addVideoResponse);

            const videoId = addVideoResponse.id;
            const deleteVideoResponse = await deleteVideo(videoId, token);
            console.log('Delete Video Response:', deleteVideoResponse);

            const updatePropertyResponse = await updateProperty(propertyId, {
                name: 'Updated Test Property',
                location: 'Haifa',
                price: 200000,
                description: 'An updated test property description',
            }, token);
            console.log('Update Property Response:', updatePropertyResponse);

            const deletePropertyResponse = await deleteProperty(propertyId, token);
            console.log('Delete Property Response:', deletePropertyResponse);

            const allFullPropertiesResponse = await getAllFullProperties(token);
            console.log('All Full Properties Response:', allFullPropertiesResponse);

        
            const updateUserResponse = await updateUser(12, { 
                name: 'Adina1',
                email:'adina1@gmail.com',
                password:'1234'
             }, token);
            console.log('Update User Response:', updateUserResponse);

            const deleteUserResponse = await deleteUser(12, token);
            console.log('Delete User Response:', deleteUserResponse);

            setResult('All API tests completed successfully!');
        } catch (error) {
            console.error('Error during API testing:', error);
            setResult(`Error during API testing: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Test API</h1>
            <button onClick={testAPI}>Run API Tests</button>
            {result && <p>{result}</p>}
        </div>
    );
};

export default TestAPI;
