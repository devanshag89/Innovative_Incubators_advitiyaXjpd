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
import clientDashboard from './Client/ClientDashboard';
import ApprovedTalentsList from './Admin/Talents';
import Clients from './Admin/Clients';
import RequestCandidateList from './Admin/Requests';
import AuthProvider from './contexts/TalentContext';
import ClientDashboard from './Client/ClientDashboard';
import ClientLogin from './Client/ClientLogin';
import ClientSignup from './Client/ClientSignup';


function App() {
  return (
    <>
    <AuthProvider>
      <Router>
        <Routes>

        <Route path='/' Component={Dashboard}/>


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
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="talents" element={<ApprovedTalentsList />} />
            <Route path="clients" element={<Clients />} />
            <Route path="requests" element={<RequestCandidateList />} />
          </Route>


          
        </Routes>
      </Router>
      </AuthProvider>
    </>
  );
}

export default App;
