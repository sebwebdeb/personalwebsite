#!/usr/bin/env node

/**
 * Simple test script for the contact form API
 */

const testContactForm = async () => {
  const testData = {
    name: "Test User",
    email: "test@example.com", 
    subject: "Test Subject",
    message: "This is a test message from the API test script."
  };

  console.log('🧪 Testing Contact Form API...\n');
  console.log('Test Data:', JSON.stringify(testData, null, 2));
  console.log('\n' + '='.repeat(50) + '\n');

  try {
    // Test OPTIONS request (CORS preflight)
    console.log('1️⃣ Testing OPTIONS request (CORS preflight)...');
    const optionsResponse = await fetch('http://localhost:7071/api/contact-form', {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:5173',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    
    console.log(`✅ OPTIONS Status: ${optionsResponse.status}`);
    console.log('Headers:', Object.fromEntries(optionsResponse.headers.entries()));
    console.log('\n' + '-'.repeat(30) + '\n');

    // Test POST request
    console.log('2️⃣ Testing POST request...');
    const postResponse = await fetch('http://localhost:7071/api/contact-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:5173'
      },
      body: JSON.stringify(testData)
    });

    const responseData = await postResponse.json();
    console.log(`✅ POST Status: ${postResponse.status}`);
    console.log('Response:', JSON.stringify(responseData, null, 2));
    console.log('\n' + '-'.repeat(30) + '\n');

    // Test invalid method
    console.log('3️⃣ Testing invalid method (GET)...');
    const getResponse = await fetch('http://localhost:7071/api/contact-form', {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:5173'
      }
    });

    const getResponseData = await getResponse.json();
    console.log(`✅ GET Status: ${getResponse.status}`);
    console.log('Response:', JSON.stringify(getResponseData, null, 2));
    console.log('\n' + '-'.repeat(30) + '\n');

    // Test validation error
    console.log('4️⃣ Testing validation error (missing required fields)...');
    const invalidData = { name: "Test" }; // Missing email and message
    
    const validationResponse = await fetch('http://localhost:7071/api/contact-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:5173'
      },
      body: JSON.stringify(invalidData)
    });

    const validationResponseData = await validationResponse.json();
    console.log(`✅ Validation Status: ${validationResponse.status}`);
    console.log('Response:', JSON.stringify(validationResponseData, null, 2));

    console.log('\n' + '='.repeat(50));
    console.log('🎉 API Testing Complete!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure the Azure Functions host is running on http://localhost:7071');
    console.log('   Run: func start (from the api directory)');
  }
};

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.error('❌ This script requires Node.js 18+ with native fetch support');
  console.log('   Or install node-fetch: npm install node-fetch');
  process.exit(1);
}

testContactForm();
