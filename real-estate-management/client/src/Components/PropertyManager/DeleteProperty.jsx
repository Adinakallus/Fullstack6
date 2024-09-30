import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import propertyService from '../../Services/propertyService';

const DeleteProperty = () => {
  const { id } = useParams();
  const history = useHistory();

  const handleDelete = async () => {
    try {
      await propertyService.deleteProperty(id);
      alert('Property deleted successfully');
      history.push('/manager/manage-inquiries');
    } catch (error) {
      alert('Error deleting property');
    }
  };

  return (
    <div>
      <h1>Delete Property</h1>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteProperty;
