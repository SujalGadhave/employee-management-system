import React, { useState } from 'react';
import { login } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    login({ username, password })
      .then(res => {
        const token = res.data.token;

        // Decode role from JWT payload (simple decode)
        const payload = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem('token', token);
        localStorage.setItem('role', payload.role);

        navigate('/employees');
      })
      .catch(() => setError('Invalid username or password'));
  };

  return (
    <div className="container">
      <h2 className="text-center">Login</h2>

      <form onSubmit={handleLogin} className="col-md-4 offset-md-4">
        {error && <div className="alert alert-danger">{error}</div>}

        <input
          className="form-control mb-2"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
