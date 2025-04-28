# Test Cases: Simulated Casino Platform API

---

## Authentication and Registration

### Test Case 1: Successful Login

**Preconditions**: 
- Server is running
- User account with email `player1@example.com` and valid password exists

**Steps**:
1. Send POST request to `/api/login` with `{ email: 'player1@example.com', password: 'correctpassword' }`

**Expected Result**:
- Response status 200
- Response body includes `token` and `userId`

---

### Test Case 2: Failed Login - Missing Email

**Preconditions**: 
- Server is running

**Steps**:
1. Send POST request to `/api/login` with `{ password: 'password123' }`

**Expected Result**:
- Response status 400
- Error message: "Missing email or password"

---

### Test Case 3: Successful Signup

**Preconditions**:
- Server is running
- Email is not already registered

**Steps**:
1. Send POST request to `/api/signup` with `{ email: 'newuser@example.com', password: 'Password123!' }`

**Expected Result**:
- Response status 201
- Response body includes success message

---

### Test Case 4: Failed Signup - Invalid Email Format

**Preconditions**:
- Server is running

**Steps**:
1. Send POST request to `/api/signup` with `{ email: 'bademailformat', password: 'Password123!' }`

**Expected Result**:
- Response status 400
- Error message: "Invalid email format"

---

### Test Case 5: Failed Signup - Weak Password

**Preconditions**:
- Server is running

**Steps**:
1. Send POST request to `/api/signup` with `{ email: 'weakpass@example.com', password: 'weakpass' }`

**Expected Result**:
- Response status 400
- Error message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol"

---

## Gameplay (Spin)

### Test Case 6: Spin With Insufficient Funds

**Preconditions**: 
- User logged in
- Balance less than 99999

**Steps**:
1. POST to `/api/spin` with `{ bet: 99999 }`

**Expected Result**:
- Response status 400
- Error message: "Insufficient funds"

---

### Test Case 7: Valid Spin Updates Balance

**Preconditions**:
- User logged in
- Balance > 100

**Steps**:
1. POST to `/api/spin` with `{ bet: 100 }`

**Expected Result**:
- Response status 200
- Response body includes `win`, `bonus`, and updated `newBalance`

---

### Test Case 8: Invalid Spin - Negative Bet

**Preconditions**:
- User logged in

**Steps**:
1. POST to `/api/spin` with `{ bet: -100 }`

**Expected Result**:
- Response status 400
- Error message: "Invalid bet amount"

---

## Account Management

### Test Case 9: Successful Deposit

**Preconditions**:
- User logged in

**Steps**:
1. POST to `/api/account/deposit` with `{ amount: 500 }`

**Expected Result**:
- Response status 200
- Response includes updated `newBalance`

---

### Test Case 10: Successful Balance Check

**Preconditions**:
- User logged in

**Steps**:
1. GET request to `/api/account/balance`

**Expected Result**:
- Response status 200
- Response body includes current `balance`

---

### Test Case 11: Successful Withdrawal

**Preconditions**:
- User logged in
- Balance >= withdrawal amount

**Steps**:
1. POST to `/api/account/withdraw` with `{ amount: 200 }`

**Expected Result**:
- Response status 200
- Updated `newBalance` in response

---

### Test Case 12: Failed Withdrawal - Insufficient Funds

**Preconditions**:
- User logged in
- Balance lower than requested withdrawal

**Steps**:
1. POST to `/api/account/withdraw` with `{ amount: 99999 }`

**Expected Result**:
- Response status 400
- Error message: "Insufficient funds"

---

