![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)

# 🎯 SQA / SDET Automation Portfolio

This portfolio demonstrates my ability to test backend software platforms in regulated, logic-heavy environments — aligned with the expectations for modern SQA and SDET roles.

It includes:
- ✅ A simulated casino platform backend built with Express.js
- ✅ Automated tests using Jest and Supertest
- ✅ Structured test documentation (test plans, test cases, and bug reports)
- ✅ Manual test case management and defect tracking using Qase.io
- ✅ Full test coverage of login, signup, spin mechanics, and account management (deposit, withdraw, balance)

---

## 🧠 Project Goals

- Showcase API test automation with realistic platform and transaction logic
- Emulate system testing workflows used in gaming, financial tech, and regulated industries
- Demonstrate professional documentation practices for functional and edge case coverage
- Highlight a strong QA mindset including both automated and manual validation

---

## 🏗️ Project Structure

```bash
qa-automation-portfolio/
├── simulated-casino-api/
├── api-tests/  
│   ├── login.test.js
│   ├── signup.test.js
│   ├── spin.test.js
│   └── account.test.js
├── docs/  
│   ├── test-plan.md
│   ├── test-cases.md
│   ├── bug-reports.md
│   └── qase-integration.md
├── cypress/
│   ├── downloads/
│   ├── e2e/
│       └── casino-api.cy.js
│   ├── fixtures/
│       └── user.json
│   └── support/
│       ├── commands.js
│       └── e2e.js
└── README.md 
```

---

## 🔧 How to Run

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Tests

```bash
npm test
```

### 3. Start Server (Optional)

```bash
npm start
```

---

## 📄 Test Run Report

The full Test Run Report for the Initial Regression Run is available [here](https://app.qase.io/public/report/9acc00fe4a841e97d2e1856e2a851f7a592af9b2).

It includes:
- Summary of all executed test cases
- Pass/Fail counts
- Linked defects
- Execution environment (Localhost API)

---

## 📄 Documentation Included

- Test Plan — Defines overall test strategy, scope, and objectives
- Test Cases — Positive, negative, and edge case scenarios
- Bug Reports — Defects found during manual and automated testing
- Qase Integration — Screenshots and management of manual tests and defect tracking using Qase.io


---

## 🧪 Cypress API Test Automation

In addition to Jest and Supertest, this project includes an automated **Cypress-based API test suite** that validates all key user workflows via direct HTTP requests.

These Cypress tests cover:

- ✅ Login, Signup, and Authentication Flows
- ✅ Account actions: Deposit, Withdraw, Balance Check
- ✅ Game logic: Spin with win/lose outcomes
- ✅ Robust failure scenarios: Invalid logins, insufficient funds, bad input

📂 Test location: `cypress/e2e/casino-api.cy.js`  
📁 Fixtures used: `cypress/fixtures/user.json`  
⚙️ Custom command: `cy.login()` defined in `cypress/support/commands.js`

To run the Cypress tests:

```bash
npx cypress open # Opens visual runner

npx cypress run # Runs headlessly
```

## 📣 About Me

I'm a full-stack engineer pivoting into QA automation and software quality assurance, with 5+ years of experience building, debugging, and maintaining platform-level systems.  
I have worked closely with QA and product teams throughout my career, and I am now specializing in automation, functional validation, and system testing.

This portfolio demonstrates my ability to design, automate, manually validate, and document QA efforts for critical, logic-heavy platforms — such as those found in gaming, finance, healthcare, and other regulated industries.

## 📬 Contact

I'm actively seeking opportunities in Software Quality Assurance (SQA) and Software Development Engineer in Test (SDET) roles.

- 📧 Email: gcyoosf@gmail.com
- 💼 LinkedIn: [George Yoo](https://www.linkedin.com/in/george-yoo/)
- 🖥️ GitHub: [georgeyoo](https://github.com/georgeyoo)

Feel free to connect with me!
