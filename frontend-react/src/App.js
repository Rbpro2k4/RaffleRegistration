import './App.css';
import React, { useState } from 'react';
import Login from './components/Login';

function App() {
  const [form, setForm] = useState({ code: '', name: '', email: '', phone: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('/.netlify/functions/checkCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="App">
      <Login form={form} onChange={handleChange} onSubmit={handleSubmit} />
      {message && <div>{message}</div>}
    </div>
  );
}

export default App;
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}

export default App;
