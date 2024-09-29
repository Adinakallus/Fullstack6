import React from 'react';

const InquiryList = ({ inquiries }) => {
  return (
    <ul>
      {inquiries.map((inquiry, index) => (
        <li key={index}>{inquiry.message}</li>
      ))}
    </ul>
  );
};

export default InquiryList;
