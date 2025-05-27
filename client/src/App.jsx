// src/App.jsx
import { useState } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import AccountPanel from './components/AccountPanel';

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">🎰 Simulated Casino</h1>
          <p className="text-gray-600 mt-1">Test your luck and manage your account</p>
        </header>

        {!token ? (
          <>
            <div className="bg-white shadow-lg rounded-lg p-6 border">
              <LoginForm setToken={setToken} setUserId={setUserId} />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 border">
              <SignupForm />
            </div>
          </>
        ) : (
          <div className="bg-white shadow-xl rounded-lg p-8 border">
            <AccountPanel token={token} userId={userId} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
