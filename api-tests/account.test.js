const request = require('supertest');
const app = require('../simulated-casino-api/app');

describe('Account Management Tests', () => {

  it('successfully adds money to account balance', async () => {
    const res = await request(app)
      .post('/api/account/deposit')
      .send({ amount: 500 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('newBalance');
    expect(typeof res.body.newBalance).toBe('number');
  });

  it('successfully checks current account balance', async () => {
    const res = await request(app)
      .get('/api/account/balance');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('balance');
    expect(typeof res.body.balance).toBe('number');
  });

  it('successfully withdraws money from account', async () => {
    const res = await request(app)
      .post('/api/account/withdraw')
      .send({ amount: 200 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('newBalance');
    expect(typeof res.body.newBalance).toBe('number');
  });

  it('prevents withdrawal if funds are insufficient', async () => {
    const res = await request(app)
      .post('/api/account/withdraw')
      .send({ amount: 99999 }); // too much
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Insufficient funds');
  });

});
