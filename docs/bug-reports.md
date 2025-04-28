# Bug Reports: Simulated Casino Platform API

---

## Bug Report 1: Missing Email Validation on Login

**Description**:
Login endpoint does not validate missing email field properly in some cases.

**Steps to Reproduce**:
1. Send POST request to `/api/login` with `{ password: 'Password123!' }`

**Expected Result**:
- 400 Bad Request with validation error: "Missing email or password"

**Actual Result**:
- 500 Internal Server Error (server crash) or generic failure message

**Severity**: Medium  
**Status**: Open

---

## Bug Report 2: Negative Bet Accepted on Spin

**Description**:
API accepts negative numbers for spin bets, allowing users to increase balance illegitimately.

**Steps to Reproduce**:
1. Send POST request to `/api/spin` with `{ bet: -100 }`

**Expected Result**:
- 400 Bad Request with validation message: "Invalid bet amount"

**Actual Result**:
- Server accepts request; balance incorrectly increases.

**Severity**: High (business logic exploit)  
**Status**: Open

---

## Bug Report 3: Invalid Email Format Allowed During Signup

**Description**:
Signup endpoint accepts invalid email format (e.g., `bademailformat` without @ symbol).

**Steps to Reproduce**:
1. Send POST request to `/api/signup` with `{ email: 'bademailformat', password: 'Password123!' }`

**Expected Result**:
- 400 Bad Request with error: "Invalid email format"

**Actual Result**:
- Signup succeeds or returns misleading response.

**Severity**: Medium  
**Status**: Open

---

## Bug Report 4: Weak Password Bypasses Signup Validation

**Description**:
Signup endpoint accepts weak passwords without uppercase, number, or symbol despite password strength requirements.

**Steps to Reproduce**:
1. Send POST request to `/api/signup` with `{ email: 'testuser@example.com', password: 'weakpass' }`

**Expected Result**:
- 400 Bad Request with error: "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol"

**Actual Result**:
- Signup incorrectly succeeds.

**Severity**: High (security vulnerability)  
**Status**: Open

---

## Bug Report 5: Deposit/Withdraw Allow Negative Amounts

**Description**:
Account management endpoints accept negative numbers for deposit or withdrawal amounts.

**Steps to Reproduce**:
1. POST to `/api/account/deposit` with `{ amount: -500 }`
2. POST to `/api/account/withdraw` with `{ amount: -100 }`

**Expected Result**:
- 400 Bad Request with message: "Invalid deposit/withdrawal amount"

**Actual Result**:
- Server accepts negative numbers, leading to balance manipulation.

**Severity**: High (critical business logic flaw)  
**Status**: Open

---

