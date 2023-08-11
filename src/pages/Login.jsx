import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../fire';
import avt from "../img/avt.gif";


const Login = () => {

  const [err, setErr] = useState(false);
  const navigate =useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const email = e.target[0].value;
    const password = e.target[1].value;
    

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate ("/");
    } catch (err) {
      setErr(true);
      setErr(err.message);
      console.error("erroe" + err.message);
    }
  };
   
  return (
    <>
    <div className="formContainer">
        <div className="formWrapper">
            <span className='logo'>Panchayat</span>
            <span className='title'>Login</span>
            <form action="" onSubmit={handleSubmit}>
               
                <input type="email" placeholder='User Email'/>
                <input type="password"placeholder='User Password' />
                <b>{err}</b>
                <button>Log In</button>
            </form>
            <p>Not have an account? <Link to="/register">Signup</Link></p>
        </div>    
    </div></>
  )
};

export default Login;
