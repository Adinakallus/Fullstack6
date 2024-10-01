const API_URL = 'http://localhost:3000'; 

async function apiRequest(endpoint, method = 'GET', data = null, token = null) {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    

    const config = {
        method,
        headers,
    };

    if (data) {
        config.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || result.message || 'Something went wrong');
        }

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Auth
export async function registerUser(userData) {
    return await apiRequest('/api/auth/register', 'POST', userData);
}

export async function loginUser(credentials) {
    return await apiRequest('/api/auth/login', 'POST', credentials);
}

// Properties
export async function getAllProperties() {
    return await apiRequest('/properties', 'GET');
}

export async function getAllFullProperties() {
    return await apiRequest('/properties/full', 'GET');
}

export async function getFullPropertyById(id) {
    return await apiRequest(`/properties/full/${id}`, 'GET');
}

export async function getPropertyById(id) {
    return await apiRequest(`/properties/${id}`, 'GET');
}

export async function createProperty(propertyData, token) {
    console.log("api/createProperty");
    
    return await apiRequest('/properties/create', 'POST', propertyData, token);
}

export async function updateProperty(id, updatedData, token) {
    return await apiRequest(`/properties/update/${id}`, 'PUT', updatedData, token);
}

export async function deleteProperty(id, token) {
    return await apiRequest(`/properties/delete/${id}`, 'DELETE', null, token);
}

export async function deleteFullProperty(id, token) {
    return await apiRequest(`/properties/full/${id}`, 'DELETE', null, token);
}

// Features
export async function addOrUpdateFeature(propertyId, featureData, token) {
    return await apiRequest(`/properties/${propertyId}/features`, 'POST', featureData, token);
}

export async function deleteFeature(propertyId, featureId, token) {
    return await apiRequest(`/properties/${propertyId}/features/${featureId}`, 'DELETE', null, token);
}

// Images
export async function addImage(propertyId, imageData, token) {
    return await apiRequest(`/properties/${propertyId}/images`, 'POST', imageData, token);
}

export async function getImagesByPropertyId(propertyId) {
    return await apiRequest(`/properties/${propertyId}/images`, 'GET');
}

export async function deleteImage(id, token) {
    return await apiRequest(`/images/${id}`, 'DELETE', null, token);
}

// Videos
export async function addVideo(propertyId, videoData, token) {
    return await apiRequest(`/properties/${propertyId}/videos`, 'POST', videoData, token);
}

export async function getVideosByPropertyId(propertyId) {
    return await apiRequest(`/properties/${propertyId}/videos`, 'GET');
}

export async function deleteVideo(id, token) {
    return await apiRequest(`/videos/${id}`, 'DELETE', null, token);
}

// Users
export async function createUser(userData, token) {
    return await apiRequest('/users', 'POST', userData, token);
}

export async function getAllUsers(token) {
    return await apiRequest('/users', 'GET', null, token);
}

export async function getUserById(id, token) {
    return await apiRequest(`/users/${id}`, 'GET', null, token);
}

export async function updateUser(id, updatedData, token) {
    return await apiRequest(`/users/${id}`, 'PUT', updatedData, token);
}

export async function deleteUser(id, token) {
    return await apiRequest(`/users/${id}`, 'DELETE', null, token);
}
