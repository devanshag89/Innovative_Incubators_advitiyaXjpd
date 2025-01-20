import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Talent/Login';
import SignupForm from './Talent/Signup';
import CompleteProfile from './Talent/Talentprofile';
import Dashboard from './Home/Dashboard';
import TalentDashboard from './Talent/TalentDashboard';
import AdminLogin from './Admin/AdminLogin';
import AdminDashboard from './Admin/AdminDashboard';
import Talents from './Admin/Talents';
import Clients from './Admin/Clients';
import Requests from './Admin/Requests';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/talent-login" Component={LoginForm} />
          <Route path="/" Component={Dashboard} />
          <Route path="/talent" Component={TalentDashboard} />
          <Route path="/talent-signup" Component={SignupForm} />
          <Route path="/admin/login" Component={AdminLogin} />
          
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="talents" element={<Talents />} />
            <Route path="clients" element={<Clients />} />
            <Route path="requests" element={<Requests />} />
          </Route>
          
          <Route path="/completeprofile" Component={CompleteProfile} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
