import React, { useState, useEffect } from 'react';
import userService from '../../Services/userService';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    company: '',
    contact: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await userService.getProfile();
      setProfile(result);
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await userService.updateProfile(profile);
      alert('Profile updated successfully');
    } catch (error) {
      alert('Error updating profile');
    }
  };

  return (
    <div>
      <h1>Update Profile</h1>
      <form>
        <input name="name" value={profile.name} onChange={handleChange} />
        <input name="email" value={profile.email} onChange={handleChange} />
        <input name="company" value={profile.company} onChange={handleChange} />
        <input name="contact" value={profile.contact} onChange={handleChange} />
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Profile;
