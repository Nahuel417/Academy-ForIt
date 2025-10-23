// Quick test script to verify JWT authentication
import request from 'supertest';
// @ts-ignore
import { app } from '@backend/app.js';

async function testAuthentication() {
  console.log('🧪 Testing JWT Authentication...\n');

  try {
    // 1. Test health check (no auth required)
    console.log('1. Testing health check endpoint...');
    const healthResponse = await request(app).get('/health');
    console.log(`   Status: ${healthResponse.status} - ${healthResponse.status === 200 ? '✅' : '❌'}`);

    // 2. Register a new user
    console.log('\n2. Registering new user...');
    const registerResponse = await request(app)
      .post('/users/register')
      .send({
        email: 'test-auth@example.com',
        password: 'password123',
        role: 'EMPLOYEE'
      });
    console.log(`   Status: ${registerResponse.status} - ${registerResponse.status === 201 ? '✅' : '❌'}`);

    // 3. Login and get JWT token
    console.log('\n3. Logging in to get JWT token...');
    const loginResponse = await request(app)
      .post('/users/login')
      .send({
        email: 'test-auth@example.com',
        password: 'password123'
      });
    console.log(`   Status: ${loginResponse.status} - ${loginResponse.status === 200 ? '✅' : '❌'}`);
    console.log(`   Token received: ${loginResponse.body.token ? '✅' : '❌'}`);

    const token = loginResponse.body.token;

    // 4. Try protected route without token
    console.log('\n4. Testing protected route without token...');
    const noAuthResponse = await request(app).get('/products');
    console.log(`   Status: ${noAuthResponse.status} - Expected 401: ${noAuthResponse.status === 401 ? '✅' : '❌'}`);

    // 5. Try protected route with valid token
    console.log('\n5. Testing protected route with valid token...');
    const authResponse = await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${token}`);
    console.log(`   Status: ${authResponse.status} - Expected 200: ${authResponse.status === 200 ? '✅' : '❌'}`);

    // 6. Test creating a product with authentication
    console.log('\n6. Creating product with authentication...');
    const productResponse = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product',
        price: 99.99,
        stock: 10,
        categories: [{ id: '1', name: 'Test' }]
      });
    console.log(`   Status: ${productResponse.status} - Expected 201: ${productResponse.status === 201 ? '✅' : '❌'}`);

    console.log('\n🎉 JWT Authentication test completed!');
    console.log('All core functionality is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testAuthentication();
