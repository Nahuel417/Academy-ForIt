import { describe, test, expect } from 'vitest';
import request from 'supertest';
// @ts-ignore
import { app } from '@backend/app.js';

describe('Users API', () => {
  test('POST /users/register - should register a new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      role: 'EMPLOYEE'
    };

    const response = await request(app)
      .post('/users/register')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(userData.email);
    expect(response.body.role).toBe(userData.role);
    expect(response.body).not.toHaveProperty('password');
  });

  test('POST /users/login - should authenticate user and return user data', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/users/login')
      .send(loginData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(loginData.email);
    expect(response.body.role).toBe('EMPLOYEE');
    expect(response.body).not.toHaveProperty('password');
  });

  test('POST /users/login - should fail with invalid credentials', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'wrongpassword'
    };

    const response = await request(app)
      .post('/users/login')
      .send(loginData);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  test('PATCH /users/:id/role - should update user role', async () => {
    // Primero registrar un usuario para obtener su ID
    const registerResponse = await request(app)
      .post('/users/register')
      .send({
        email: 'admin@example.com',
        password: 'password123',
        role: 'EMPLOYEE'
      });

    const userId = registerResponse.body.id;

    const response = await request(app)
      .patch(`/users/${userId}/role`)
      .send({ role: 'ADMIN' });

    expect(response.status).toBe(200);
    expect(response.body.role).toBe('ADMIN');
  });
});
