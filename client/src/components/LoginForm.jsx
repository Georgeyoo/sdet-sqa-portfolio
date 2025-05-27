import { useState } from 'react';

function LoginForm({ setToken, setUserId }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');
      setToken(data.token);
      setUserId(data.userId);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Login</h2>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 px-3 py-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 px-3 py-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
