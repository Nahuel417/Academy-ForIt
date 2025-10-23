// @ts-ignore
import { test, expect } from 'vitest';
import request from 'supertest';
// @ts-ignore
import { app } from '@backend/app.js';

test('JWT Authentication Flow', async () => {
  // 1. Register a new user
  const registerResponse = await request(app)
    .post('/users/register')
    .send({
      email: 'jwt-test@example.com',
      password: 'password123',
      role: 'EMPLOYEE'
    });

  expect(registerResponse.status).toBe(201);
  expect(registerResponse.body).toHaveProperty('id');

  // 2. Login and get JWT token
  const loginResponse = await request(app)
    .post('/users/login')
    .send({
      email: 'jwt-test@example.com',
      password: 'password123'
    });

  expect(loginResponse.status).toBe(200);
  expect(loginResponse.body).toHaveProperty('token');
  expect(loginResponse.body).toHaveProperty('user');
  expect(loginResponse.body.user.email).toBe('jwt-test@example.com');

  const token = loginResponse.body.token;

  // 3. Try to access protected route without token (should fail)
  const noAuthResponse = await request(app)
    .get('/products');

  expect(noAuthResponse.status).toBe(401);

  // 4. Access protected route with valid token (should work)
  const authResponse = await request(app)
    .get('/products')
    .set('Authorization', `Bearer ${token}`);

  expect(authResponse.status).toBe(200);
  expect(Array.isArray(authResponse.body)).toBe(true);

  // 5. Try with invalid token (should fail)
  const invalidTokenResponse = await request(app)
    .get('/products')
    .set('Authorization', 'Bearer invalid-token');

  expect(invalidTokenResponse.status).toBe(401);

  console.log('✅ JWT Authentication Flow test passed!');
});
