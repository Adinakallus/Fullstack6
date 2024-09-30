import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './Components/NavBar';
import Footer from './Components/Footer';
import RegistrationPage from './Pages/Registration';  // Import the Registration page
import Home from './Pages/Home';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
