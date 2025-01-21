import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Talent/Login';
import SignupForm from './Talent/Signup';
import CompleteProfile from './Talent/Talentprofile';
import TalentDashboard from './Talent/TalentDashboard';
import Dashboard from './Home/Dashboard';
import AdminLogin from './Admin/AdminLogin';
import AdminDashboard from './Admin/AdminDashboard';
import ClientDashboard from './Client/ClientDashboard';
import ApprovedTalentsList from './Admin/Talents';
import Clients from './Admin/Clients';
import RequestCandidateList from './Admin/Requests';
import AuthProvider from './contexts/TalentContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path='/talent-login' element={<LoginForm />} />
          <Route path='/talent-signup' element={<SignupForm />} />
      
          {/* Home Routes */}
          <Route path="/" element={<Dashboard />} />

          {/* Talent Routes */}
          <Route path="/talent-dashboard" element={<TalentDashboard />} />
          <Route path="/completeprofile" element={<CompleteProfile />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="talents" element={<ApprovedTalentsList />} />
            <Route path="clients" element={<Clients />} />
            <Route path="requests" element={<RequestCandidateList />} />
          </Route>

          {/* Client Routes */}
          <Route path="/clientDashboard" element={<ClientDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
