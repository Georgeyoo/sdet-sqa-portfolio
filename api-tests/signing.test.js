const request = require('supertest');
const app = require('../simulated-casino-api/app');

describe('Login API Tests', () => {
  it('logs in successfully with correct email and password', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'player1@example.com', password: 'correctpassword' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('userId');
  });

  it('fails login with missing email', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ password: 'correctpassword' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Missing email or password');
  });

  it('fails login with invalid email', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'wronguser@example.com', password: 'correctpassword' });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Invalid credentials');
  });

  it('fails login with missing password', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'player1@example.com' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Missing email or password');
  });

  it('fails login with invalid password', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'player1@example.com', password: 'wrongpassword' });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Invalid credentials');
  });

  it('fails login with SQL injection attempt', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: "' OR 1=1 --", password: "' OR 1=1 --" });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Invalid credentials');
  });
});
