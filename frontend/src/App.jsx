
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './Talent/Login';
import SignupForm from './Talent/Signup';
import CompleteProfile from './Talent/Talentprofile';
import Dashboard from './Home/Dashboard';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/talentlogin' Component={LoginForm}/>
          <Route path='/' Component={Dashboard}/>
          <Route path='/talentsignup' Component={SignupForm}/>
          <Route path='/completeprofile' Component={CompleteProfile}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
