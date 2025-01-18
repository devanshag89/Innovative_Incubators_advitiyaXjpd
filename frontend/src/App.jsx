import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './Talent/Login';
import SignupForm from './Talent/Signup';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/talentlogin' Component={LoginForm}/>
          <Route path='/talentsignup' Component={SignupForm}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
