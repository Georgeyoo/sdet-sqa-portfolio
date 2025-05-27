import { useState, useEffect } from 'react';

function AccountPanel({ token, userId }) {
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchBalance = async () => {
    try {
      const res = await fetch('/api/account/balance');
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch balance');
      setBalance(data.balance);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleTransaction = async (type) => {
    setMessage('');
    setError('');

    const endpoint = type === 'deposit' ? '/api/account/deposit' : '/api/account/withdraw';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Transaction failed');
      setBalance(data.newBalance);
      setMessage(`${type === 'deposit' ? 'Deposited' : 'Withdrew'} $${amount}`);
      setAmount('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Welcome, User #{userId}</h2>

      <div className="mb-4">
        <strong>Current Balance:</strong>{' '}
        {balance !== null ? `$${balance}` : 'Loading...'}
      </div>

      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      {message && <div className="text-green-600 text-sm mb-2">{message}</div>}

      <div className="flex gap-2 mb-3">
        <input
          type="number"
          min="0"
          step="0.01"
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={() => handleTransaction('deposit')}
        >
          Deposit
        </button>
        <button
          type="button"
          className="w-1/2 bg-red-600 text-white py-2 rounded hover:bg-red-700"
          onClick={() => handleTransaction('withdraw')}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}

export default AccountPanel;
