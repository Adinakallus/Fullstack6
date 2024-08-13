import React from 'react';
import AddUser from './components/AddUser';
import AddProperty from './components/AddProperty';
import './App.css';

function App() {
  return (
    <div>
      <h1>Real Estate Management</h1>
      <AddUser />
      <AddProperty />
    </div>
  );
}

export default App;
