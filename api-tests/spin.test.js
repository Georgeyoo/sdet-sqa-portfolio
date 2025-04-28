const request = require('supertest');
const app = require('../simulated-casino-api/app');

describe('Spin Tests', () => {

  it('prevents spins if funds are insufficient', async () => {
    const res = await request(app)
      .post('/api/spin')
      .send({ bet: 99999 }); // Way too high
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Insufficient funds');
  });

  it('allows a valid spin and returns result', async () => {
    const res = await request(app)
      .post('/api/spin')
      .send({ bet: 100 }); // Normal bet
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('win');
    expect(res.body).toHaveProperty('bonus');
    expect(res.body).toHaveProperty('newBalance');
  });

  it('fails spin with negative bet', async () => {
    const res = await request(app)
      .post('/api/spin')
      .send({ bet: -100 });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Invalid bet amount');
  });

  it('fails spin with zero bet', async () => {
    const res = await request(app)
      .post('/api/spin')
      .send({ bet: 0 });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Invalid bet amount');
  });

  it('fails spin with non-numeric bet', async () => {
    const res = await request(app)
      .post('/api/spin')
      .send({ bet: 'abc' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Invalid bet amount');
  });

});
