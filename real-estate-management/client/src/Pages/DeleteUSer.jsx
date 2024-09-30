import React, { useState, useEffect } from 'react';
import { deleteUser } from '../API/api'; // Import delete API
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const DeleteUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null); // Store userId in state

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      setError('No valid session found, please log in.');
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token); // Decode the token
      setUserId(decoded.id); // Set userId in state
    } catch (decodeError) {
      setError('Invalid token, please log in again.');
      localStorage.removeItem('token');
      navigate('/login');
      return;
    }
  }, [token, navigate]); // This effect only sets userId from the token


  const handleDelete = async () => {
    try {
      await deleteUser(userId, token); // Call delete user API
      localStorage.removeItem('token'); // Clear the token after deleting account
      navigate('/register'); // Redirect to registration after deletion
    } catch (error) {
      setError('Failed to delete account');
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h2>Delete Account</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleShowModal} style={styles.deleteButton}>
        Delete Account
      </button>

      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <button onClick={handleDelete} style={styles.confirmButton}>Yes, Delete</button>
            <button onClick={handleCloseModal} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  deleteButton: {
    backgroundColor: '#ff5722',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#e53935',
    color: '#fff',
    padding: '10px 20px',
    marginRight: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#607d8b',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default DeleteUser;
