import React, { useEffect, useState } from 'react'
import './Navbar.css'
import loupe from '../../Assets/loupe.png'
import localise from "../../Assets/localise.png"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { clearUser } from '../../Redux/Slices/UserSlice'


function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  const {locationInfo,error } = useSelector((state) => state.geolocation);
  const dispatch = useDispatch()
  //Geolocation
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await axios.get('/api/auth/user', {
            headers: { 'x-auth-token': token }
          });
          setIsAuthenticated(true);
        } catch (err) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };
  
    checkAuth();
  }, []);

  //Authentication

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser());
  };

  //Dropdown button
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);


  return (
    <div className='navwrapper'>
        <h2 className='Apptitle'>DateYourPlace</h2>
        <form>
            <input  className="SearchSearch" type="text" placeholder="Search..." />
            <button className='SubmitSearch' type="submit"><img id='loupe' src={loupe} alt="loupe" /></button>
        </form>
     
        <div className="p-4">
          {error ? (
          <p className="text-red-500">{null}</p>
          ) : ( isAuthenticated ?  <div className="mb2wrapper">
            
          <z className="wrapperlocalise">
            
            { locationInfo && ( <div><img className='localiseicon' src={localise} alt="Not Found" />
              <p className="mb-2">{locationInfo.city || 'N/A'}</p></div>)}
              
              <div className="profile-dropdown">
                <button onClick={toggleDropdown} className="profile-button">
                  <img
                  src={currentUser && currentUser.profilePicture}
                  alt="Profile"
                  className="profile-image"
                  />
                </button>
                <div className={`dropdown ${isOpen ? 'open' : ''}`}>
                <h2>{currentUser && currentUser.email}</h2>
                  <button onClick={logout} className="logout-button">
                    Logout
                   </button>
                  
                </div>
                </div>
          </z>
         
            </div> :  
            <div className="mb2wrapper">
         
            </div>
         
          )}
        </div>
        
    </div>
  )
}

export default Navbar