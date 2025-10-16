import './App.css';
import React, { useState } from 'react';
import Login from './components/Login';

function App() {
  const [form, setForm] = useState({ code: '', name: '', email: '', phone: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      // Use local Netlify dev server when running locally, otherwise use relative path
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const endpoint = isLocal
        ? 'http://localhost:8888/.netlify/functions/checkCode'
        : '/.netlify/functions/checkCode';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      // Always use data.message for feedback
      setMessage(data.message || 'No message from server.');
    } catch (err) {
      setMessage('Network error or server unavailable.');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <Login form={form} onChange={handleChange} onSubmit={handleSubmit} />
      <form onSubmit={handleSubmit}>
        <input name="code" placeholder="Code" value={form.code} onChange={handleChange} required />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <button
          className="good-luck-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="spinner"></span>
          ) : (
            'Good Luck!'
          )}
        </button>
      </form>
      {message && <div className="message">{message}</div>}
      <style>
        {`
          .spinner {
            display: inline-block;
            width: 18px;
            height: 18px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #333;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            vertical-align: middle;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
          .good-luck-btn {
            background-color: #4CAF50;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 4px;
            transition: background-color 0.3s, transform 0.3s;
          }
          .good-luck-btn:hover {
            background-color: #45a049;
            transform: scale(1.05);
          }
          .good-luck-btn:active {
            transform: scale(0.95);
          }
        `}
      </style>
    </div>
  );
}

export default App;
