import React from 'react';
import './Popup.css'

const Popup = ({ error }) => {
    
    const triggerRefresh = () => {
        window.history.go(0);        };  

    return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="text-xl font-bold mb-4">Location Access Required</h2>
        <p className="mb-4">
          This app needs access to your location to function properly. Please enable location access in your browser settings
        </p>
        <button
          onClick={triggerRefresh}
          className="StyledButton"
        >
          Request Location Access
        </button>
      </div>
    </div>
  );
};

export default Popup;