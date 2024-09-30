import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import propertyService from '../../Services/propertyService';

const MakeInquiry = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await propertyService.makeInquiry(id, message);
      alert('Inquiry sent successfully');
    } catch (error) {
      alert('Error sending inquiry');
    }
  };

  return (
    <div>
      <h1>Make Inquiry</h1>
      <textarea value={message} onChange={handleChange} placeholder="Your message"></textarea>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MakeInquiry;
