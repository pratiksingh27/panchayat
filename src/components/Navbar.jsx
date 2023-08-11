import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../fire';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const zoom = () =>{
    console.log("hello")
  }
  const {currentUser} = useContext(AuthContext)
  return (
    <>
     <div className="navbar">
      <span className="logo">Panchayat</span>
      {/* <span onClick={close}>close</span> */}
      <div className="user">
        <img src={currentUser.photoURL} id='img' onClick={zoom} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
     </div>
    </>
  )
}

export default Navbar
