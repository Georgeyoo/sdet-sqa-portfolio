const request = require('supertest');
const app = require('../simulated-casino-api/app');

describe('Signup API Tests', () => {

  it('successfully creates an account with valid email and strong password', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({ email: 'newuser@example.com', password: 'Password123!' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Account created successfully');
  });

  it('fails signup with missing email', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({ password: 'Password123!' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Missing email or password');
  });

  it('fails signup with missing password', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({ email: 'anotheruser@example.com' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Missing email or password');
  });

  it('fails signup with invalid email format', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({ email: 'bademailformat', password: 'Password123!' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid email format');
  });

  it('fails signup with weak password (no uppercase letter)', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({ email: 'user2@example.com', password: 'password123!' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol');
  });

  it('fails signup with weak password (no number)', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({ email: 'user3@example.com', password: 'Password!@#' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol');
  });

  it('fails signup with weak password (less than 8 characters)', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({ email: 'user4@example.com', password: 'P1!' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol');
  });

  it('fails signup with already registered email', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({ email: 'player1@example.com', password: 'Password123!' });
    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty('message', 'Email already registered');
  });

});
