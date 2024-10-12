import React, { useEffect, useState} from 'react';
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import AuthPopup from './Components/Login/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './Components/Home/Home';
import Loader from './Components/Loader/Loader';
import { clearUser, setUser } from './Redux/Slices/UserSlice';


export default function App() {
 
  const [usi, setUsi] = useState(null);
  const [loadings, setLoadings] = useState(true);


//Authentifcatition
const dispatch = useDispatch();

useEffect(() => {
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await axios.get('/api/auth/user', {
          headers: { 'x-auth-token': token }
        });
        dispatch(setUser(res.data));
      } catch (err) {
        localStorage.removeItem('token');
        dispatch(clearUser());
      }
    } else {
      dispatch(clearUser());
    }
  }

  checkAuth();
}, [dispatch]);


const login = (token, userData) => {
  localStorage.setItem('token', token);
  dispatch(setUser(userData));
};

const fetchUser = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const res = await axios.get('/api/auth/user', {
        headers: { 'x-auth-token': token }
      });
      setUsi(res.data);
    } catch (error) {
      console.error('Error fetching user data', error);
      localStorage.removeItem('token');
    }
  }
  setLoadings(false);
};

useEffect(() => {
  fetchUser();
}, []);


const { isAuthenticated, loading } = useSelector((state) => state.user);
if (loading) {
  return <Loader/>
}


  return (
    <Router>
      <div className="App">
      
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated  ? <Navigate to="/dashboard" /> : <AuthPopup login={login} />} 
          />
          <Route 
            path="/dashboard" 
            element={isAuthenticated  ? <Home user={usi} /> : <Navigate to="/" />} 
          />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}