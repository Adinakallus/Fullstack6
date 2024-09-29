import React, { useState, useEffect } from 'react';
import propertyService from '../../Services/propertyService';
import InquiryList from '../Shared/InquiryList';

const ManageInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      const result = await propertyService.getInquiries();
      setInquiries(result);
    };
    fetchInquiries();
  }, []);

  return (
    <div>
      <h1>Manage Inquiries</h1>
      <InquiryList inquiries={inquiries} />
    </div>
  );
};

export default ManageInquiries;
