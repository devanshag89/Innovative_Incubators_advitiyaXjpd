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
import ApprovedTalentsList from './Admin/Talents';
import Clients from './Admin/Clients';
import RequestCandidateList from './Admin/Requests';
import AuthProvider from './contexts/TalentContext';
import ClientDashboard from './Client/ClientDashboard';
import ClientLogin from './Client/ClientLogin';
import ClientSignup from './Client/ClientSignup';


import ProtectedRoute from './contexts/ProtectedRoute'; // Import ProtectedRoute


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/talent-login" element={<LoginForm />} />
          <Route path="/talent-signup" element={<SignupForm />} />

          {/* Home Routes */}
          <Route path="/" element={<Dashboard />} />

          {/* Protected Talent Routes */}
          <Route
            path="/talent-dashboard"
            element={
              <ProtectedRoute>
                <TalentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/completeprofile"
            element={
              <ProtectedRoute>
                <CompleteProfile />
              </ProtectedRoute>
            }
          />


          <Route path='/talent/login' Component={LoginForm}/>
          <Route path='/talent' Component={TalentDashboard}/>
          <Route path='/talent/signup' Component={SignupForm}/>
          <Route path='/completeprofile' Component={CompleteProfile}/>


          <Route path='/admin/login' Component={AdminLogin}/>
          <Route path='/admin/' Component={AdminDashboard}/>


          
          <Route path='/client' Component={ClientDashboard}/>
          <Route path='/client/login' Component={ClientLogin}/>
          <Route path='/client/signup' Component={ClientSignup}/>
          {/* client login */}

          <Route path="/admin/login" Component={AdminLogin} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="talents" element={<ApprovedTalentsList />} />
            <Route path="clients" element={<Clients />} />
            <Route path="requests" element={<RequestCandidateList />} />
          </Route>

          {/* Client Routes */}
          <Route path="/client" element={<ClientDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
