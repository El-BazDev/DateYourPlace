import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import './ProfileDropdown.css';
import { useNavigate } from 'react-router-dom';


const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user } = useSelector((state) => state.auth);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="profile-dropdown">
      <button onClick={toggleDropdown} className="profile-button">
        <img
          src="/api/placeholder/40/40"
          alt="Profile"
          className="profile-image"
        />
      </button>
      <div className={`dropdown ${isOpen ? 'open' : ''}`}>
        <h2>{user.email}</h2>
        <button onClick={handleLogout} className="logout-button">
            
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;