import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'
import Navbar from '../Navbar/Navbar';
  
function importAll(r) {
  return r.keys().map(r);
}

const profilePictures = importAll(require.context('../../photos', false, /\.(png|jpe?g|svg)$/));






const Login = ({ login }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    profilePicture: ''
  });

  const { name, email, password, age, profilePicture } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify(isLogin ? { email, password } : { name, email, password , age: parseInt(age), profilePicture: profilePicture.split('/').pop() });
    try {
      const res = await axios.post(
        `/api/auth/${isLogin ? 'login' : 'register'}`,
        body,
        config
      );
      login(res.data.token);
    } catch (err) {
      console.error(err.response.data);
      // Handle error (e.g., show error message to user)
    }
  };


  //Import Photos

  return (
    <div><Navbar/>
    <div className="auth-popup">
      
      <div className='auth-content'>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={onSubmit}>
      {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
            <input
              type="number"
              placeholder="Age"
              name="age"
              value={age}
              onChange={onChange}
              required
            />
            <div>
              <label>Choose a profile picture:</label>
              <div className="profile-pictures">
                {profilePictures.map((pic, index) => (
                  <img 
                    key={index}
                    src={pic}
                    alt={`Profile ${index + 1}`}
                    onClick={() => setFormData({ ...formData, profilePicture: pic })}
                    className={profilePicture === pic ? 'selected' : 'notselected'}
                  />
                ))}
              </div>
            </div>
          </>
        )}
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          minLength="6"
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
      </div>
    </div>
    </div>
  );
};

export default Login;