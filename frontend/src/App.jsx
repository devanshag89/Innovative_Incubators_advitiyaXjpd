
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './Talent/Login';
import SignupForm from './Talent/Signup';
import CompleteProfile from './Talent/Talentprofile';
import Dashboard from './Home/Dashboard';
import TalentDashboard from './Talent/TalentDashboard';
import AdminLogin from './Admin/AdminLogin';
import AdminDashboard from './Admin/AdminDashboard';
import clientDashboard from './Client/ClientDashboard';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/talent-login' Component={LoginForm}/>
          <Route path='/' Component={Dashboard}/>
          <Route path='/talent' Component={TalentDashboard}/>
          <Route path='/talent-signup' Component={SignupForm}/>
          <Route path='/admin/login' Component={AdminLogin}/>
          <Route path='/admin/' Component={AdminDashboard}/>
          <Route path='/completeprofile' Component={CompleteProfile}/>
          <Route path='/clientDashboard' Component={clientDashboard}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
