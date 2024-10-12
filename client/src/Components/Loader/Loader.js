import React from 'react'
import './Loader.css'
function Loader() {
  return (
  <div className='loading-wrapper'>
    <div className="loading-container">
    <div className="spinner"></div>
        <h2 className="loading-text">Loading...</h2>
    </div>
  </div>
    
  )
}

export default Loader