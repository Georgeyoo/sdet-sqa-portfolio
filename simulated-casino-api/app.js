// simulated-casino-api/app.js
const express = require('express');
const app = express();
app.use(express.json());

// User data simulation
let users = [{ id: 1, username: 'player1', balance: 1000 }];
let currentUser = users[0]; // Simulate a logged-in user
let balance = 1000; // Example default balance


app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing email or password' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol' });
  }

  if (email === 'player1@example.com') {
    return res.status(409).json({ message: 'Email already registered' });
  }

  return res.status(201).json({ message: 'Account created successfully', userId: 2 });
});


app.post('/api/login', (req, res) => {
  const { username } = req.body;
  if (username === 'player1') {
    return res.json({ token: 'mock-token', userId: 1 });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

app.post('/api/spin', (req, res) => {
  const { bet } = req.body;
  if (bet > currentUser.balance) {
    return res.status(400).json({ message: 'Insufficient funds' });
  }

  currentUser.balance -= bet;

  const outcome = Math.random();
  const result = {
    win: outcome > 0.7,
    bonus: outcome > 0.9,
    newBalance: currentUser.balance + (outcome > 0.7 ? bet * 2 : 0)
  };

  currentUser.balance = result.newBalance;
  res.json(result);
});


app.post('/api/account/deposit', (req, res) => {
  const { amount } = req.body;
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ message: 'Invalid deposit amount' });
  }
  balance += amount;
  res.status(200).json({ newBalance: balance });
});

app.get('/api/account/balance', (req, res) => {
  res.status(200).json({ balance });
});

app.post('/api/account/withdraw', (req, res) => {
  const { amount } = req.body;
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ message: 'Invalid withdrawal amount' });
  }
  if (balance < amount) {
    return res.status(400).json({ message: 'Insufficient funds' });
  }
  balance -= amount;
  res.status(200).json({ newBalance: balance });
});
module.exports = app;
