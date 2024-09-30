import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Update with your server URL

const addProperty = async (propertyData) => {
  return await axios.post(`${API_URL}/properties`, propertyData);
};

const getProperty = async (id) => {
  return await axios.get(`${API_URL}/properties/${id}`);
};

const updateProperty = async (id, propertyData) => {
  return await axios.put(`${API_URL}/properties/${id}`, propertyData);
};

const deleteProperty = async (id) => {
  return await axios.delete(`${API_URL}/properties/${id}`);
};

const getProperties = async (searchParams) => {
  return await axios.get(`${API_URL}/properties`, { params: searchParams });
};

const getFavorites = async () => {
  return await axios.get(`${API_URL}/favorites`);
};

const getSearchHistory = async () => {
  return await axios.get(`${API_URL}/search-history`);
};

const makeInquiry = async (propertyId, message) => {
  return await axios.post(`${API_URL}/properties/${propertyId}/inquiries`, { message });
};

const getInquiries = async () => {
  return await axios.get(`${API_URL}/inquiries`);
};

export default {
  addProperty,
  getProperty,
  updateProperty,
  deleteProperty,
  getProperties,
  getFavorites,
  getSearchHistory,
  makeInquiry,
  getInquiries,
};
