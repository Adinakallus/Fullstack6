import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Update with your server URL

const getProfile = async () => {
  return await axios.get(`${API_URL}/profile`);
};

const updateProfile = async (profileData) => {
  return await axios.put(`${API_URL}/profile`, profileData);
};

export default {
  getProfile,
  updateProfile,
};
