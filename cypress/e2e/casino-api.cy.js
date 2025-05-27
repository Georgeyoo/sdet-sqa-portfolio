describe('Casino API - E2E Cypress API Tests', () => {
    const baseUrl = 'http://localhost:3033/api';

    beforeEach(function () {
        cy.fixture('user').as('userData');
    });

    it('should log in using custom command', function () {
        cy.login(this.userData.valid.email, this.userData.valid.password);
    });

    it('should fail signup with existing email', function () {
        cy.request({
          method: 'POST',
          url: `${baseUrl}/signup`,
          failOnStatusCode: false,
          body: this.userData.valid
        }).then((res) => {
          expect(res.status).to.eq(409);
          expect(res.body.message).to.include('Email already registered');
        });
      });
      
      it('should successfully log in', function () {
        cy.request('POST', `${baseUrl}/login`, this.userData.valid).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.have.property('token');
        });
      });

    it('should return current balance', () => {
        cy.request('GET', `${baseUrl}/account/balance`).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('balance');
        });
    });

    it('should deposit money', () => {
        cy.request('POST', `${baseUrl}/account/deposit`, {
            amount: 100,
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('newBalance');
        });
    });

    it('should withdraw money', () => {
        cy.request('POST', `${baseUrl}/account/withdraw`, {
            amount: 50,
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('newBalance');
        });
    });

    it('should spin the wheel with a valid bet', () => {
        cy.request('POST', `${baseUrl}/spin`, {
            bet: 10,
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('win');
            expect(res.body).to.have.property('bonus');
            expect(res.body).to.have.property('newBalance');
        });
    });
});

describe('Casino API - Failure Scenarios', () => {
    const baseUrl = 'http://localhost:3033/api';

    beforeEach(function () {
        cy.fixture('user').as('userData');
    });

    it('should reject login with incorrect password', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/login`,
            failOnStatusCode: false,
            body: {
                email: 'player1@example.com',
                password: 'wrongpassword',
            },
        }).then((res) => {
            expect(res.status).to.eq(401);
            expect(res.body.message).to.include('Invalid credentials');
        });
    });

    it('should reject login with missing email', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/login`,
            failOnStatusCode: false,
            body: {
                password: 'Password123!',
            },
        }).then((res) => {
            expect(res.status).to.eq(401); // or 400 depending on your backend logic
        });
    });

    it('should reject withdrawal that exceeds balance', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/account/withdraw`,
            failOnStatusCode: false,
            body: {
                amount: 999999, // Intentionally large
            },
        }).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.message).to.include('Insufficient funds');
        });
    });

    it('should reject deposit of negative amount', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/account/deposit`,
            failOnStatusCode: false,
            body: {
                amount: -100,
            },
        }).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.message).to.include('Invalid deposit amount');
        });
    });

    it('should reject spin with zero bet', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/spin`,
            failOnStatusCode: false,
            body: {
                bet: 0,
            },
        }).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.message).to.include('Invalid bet amount');
        });
    });

    it('should reject spin with missing bet', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/spin`,
            failOnStatusCode: false,
            body: {},
        }).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.message).to.include('Invalid bet amount');
        });
    });
});
