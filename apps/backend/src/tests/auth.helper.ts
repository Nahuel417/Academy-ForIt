// @ts-ignore
import { test, expect, beforeAll } from 'vitest';
// @ts-ignore
import request from 'supertest';
// @ts-ignore
import { app } from '@backend/app.js';

interface AuthTokens {
  adminToken: string;
  employeeToken: string;
}

let tokens: AuthTokens;

beforeAll(async () => {
  // Create admin user
  await request(app)
    .post('/users/register')
    .send({
      email: 'admin@test.com',
      password: 'admin123',
      role: 'ADMIN'
    });

  // Create employee user
  await request(app)
    .post('/users/register')
    .send({
      email: 'employee@test.com',
      password: 'employee123',
      role: 'EMPLOYEE'
    });

  // Login as admin
  const adminLogin = await request(app)
    .post('/users/login')
    .send({
      email: 'admin@test.com',
      password: 'admin123'
    });

  // Login as employee
  const employeeLogin = await request(app)
    .post('/users/login')
    .send({
      email: 'employee@test.com',
      password: 'employee123'
    });

  tokens = {
    adminToken: adminLogin.body.token,
    employeeToken: employeeLogin.body.token
  };
});

export { tokens };
