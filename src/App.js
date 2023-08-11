// import logo from './logo.svg';
// import './App.css';
import './style.scss';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
// import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
 
  const {currentUser} = useContext(AuthContext)
  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/login"/>;
     }
     
     return children
     
    };
  
  // console.log(currentUser);

  return (
    // <div className="App" >
      <BrowserRouter>
      <Routes>
        <Route index element={ 
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
        }/>
        <Route path='login' element = {<Login />}/>
        <Route path='register' element = {<Register />}/>
      </Routes>
      </BrowserRouter>
      
    // </div>
  );
}

export default App;
