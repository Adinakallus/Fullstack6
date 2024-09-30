import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddProperty from './Components/PropertyManager/AddProperty';
import EditProperty from './Components/PropertyManager/EditProperty';
import DeleteProperty from './Components/PropertyManager/DeleteProperty';
import ManageInquiries from './Components/PropertyManager/ManageInquiries';
import Profile from './Components/PropertyManager/Profile';
import SearchProperties from './Components/PropertySeeker/SearchProperties';
import PropertyDetails from './Components/PropertySeeker/PropertyDetails';
import Favorites from './Components/PropertySeeker/Favorites';
import SearchHistory from './Components/PropertySeeker/SearchHistory';
import MakeInquiry from './Components/PropertySeeker/MakeInquiry';
import NavigationBar from './Components/NavBar';
import Footer from './Components/Footer';
import RegistrationPage from './Pages/Registration';  
import LoginPage from './Pages/Login';
import Home from './Pages/Home';

const App = () => {
  return (
    <Router>
      <Switch>
      <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/manager/add-property" component={AddProperty} />
        <Route path="/manager/edit-property/:id" component={EditProperty} />
        <Route path="/manager/delete-property/:id" component={DeleteProperty} />
        <Route path="/manager/manage-inquiries" component={ManageInquiries} />
        <Route path="/manager/profile" component={Profile} />
        <Route path="/seeker/search-properties" component={SearchProperties} />
        <Route path="/seeker/property-details/:id" component={PropertyDetails} />
        <Route path="/seeker/favorites" component={Favorites} />
        <Route path="/seeker/search-history" component={SearchHistory} />
        <Route path="/seeker/make-inquiry/:id" component={MakeInquiry} />
      </Switch>
    </Router>
  );
};

export default App;
