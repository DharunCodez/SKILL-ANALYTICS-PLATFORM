import React, { useState } from 'react';
import { login } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function handle(e) {
    e.preventDefault();
    try {
      await login({ email, password });
      window.location = '/dashboard';
    } catch (err) { setError(err.message); }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handle}>
        <div>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
