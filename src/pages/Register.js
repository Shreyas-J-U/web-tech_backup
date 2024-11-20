import React, { useState, useEffect } from 'react';
import './RegisterPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  // Check if the user is logged in (by checking for a token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Set logged-in state to true
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        password,
      });

      alert('User registered successfully!');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Registration error:', err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data.message : 'Something went wrong. Please try again.');
    }
  };

  const handleRedirectToLogin = () => {
    navigate('/login');
  };

  if (isLoggedIn) {
    return (
      <div className="register-page">
        <h2>You are already logged in.</h2>
        <p>Please logout to register a new user.</p>
        <button onClick={handleRedirectToLogin}>Got it</button>
      </div>
    );
  }

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
