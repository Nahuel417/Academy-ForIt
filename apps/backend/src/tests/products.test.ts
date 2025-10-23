import { describe, test, expect } from 'vitest';
import request from 'supertest';
// @ts-ignore
import { app } from '@backend/app.js';
// @ts-ignore
import { tokens } from '@backend/tests/auth.helper.js';

describe('Products API', () => {
  test('POST /products - should create a new product', async () => {
    const productData = {
      name: 'Laptop',
      price: 1000,
      stock: 10,
      categories: [{ id: '1', name: 'Electronics' }]
    };

    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${tokens.employeeToken}`)
      .send(productData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(productData.name);
    expect(response.body.price).toBe(productData.price);
    expect(response.body.stock).toBe(productData.stock);
    expect(response.body.categories).toEqual(productData.categories);
  });

  test('GET /products - should return list of products', async () => {
    const response = await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${tokens.employeeToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /products/:id - should return a single product', async () => {
    // First create a product
    const createResponse = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${tokens.employeeToken}`)
      .send({
        name: 'Mouse',
        price: 50,
        stock: 20,
        categories: [{ id: '1', name: 'Electronics' }]
      });

    const productId = createResponse.body.id;

    const response = await request(app)
      .get(`/products/${productId}`)
      .set('Authorization', `Bearer ${tokens.employeeToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(productId);
    expect(response.body.name).toBe('Mouse');
  });

  test('PATCH /products/:id - should update a product', async () => {
    // First create a product
    const createResponse = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${tokens.employeeToken}`)
      .send({
        name: 'Keyboard',
        price: 100,
        stock: 15,
        categories: [{ id: '1', name: 'Electronics' }]
      });

    const productId = createResponse.body.id;

    const updateData = {
      name: 'Gaming Keyboard',
      price: 150
    };

    const response = await request(app)
      .patch(`/products/${productId}`)
      .set('Authorization', `Bearer ${tokens.employeeToken}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updateData.name);
    expect(response.body.price).toBe(updateData.price);
  });

  test('DELETE /products/:id - should delete a product', async () => {
    // First create a product
    const createResponse = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${tokens.employeeToken}`)
      .send({
        name: 'Monitor',
        price: 300,
        stock: 5,
        categories: [{ id: '1', name: 'Electronics' }]
      });

    const productId = createResponse.body.id;

    const deleteResponse = await request(app)
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${tokens.employeeToken}`);

    expect(deleteResponse.status).toBe(204);

    // Verify it's deleted
    const getResponse = await request(app)
      .get(`/products/${productId}`)
      .set('Authorization', `Bearer ${tokens.employeeToken}`);

    expect(getResponse.status).toBe(404);
  });
});
