import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './components/Map';
import AuthForm from './auth/AuthForm';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
};

export default App;
