const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:3000/api/interventions/financial';
// Replace with a valid MongoDB ObjectId from your database
const STATIC_SPONSORED_MEMBER_ID = '6849646feaa08161083d1aec'; 

// Test data for creating a financial intervention
const testInterventionData = {
  type_of_assistance: 'Food Assistance',
  area_and_subproject: 'FDQ',
  problem_presented: 'Family needs food assistance due to loss of income.',
  recommendation: 'Provide food assistance package for 2 weeks.'
};

// Test functions
async function testCreateForm() {
  try {
    console.log('\n--- Testing CREATE Financial Intervention Form ---');
    const response = await axios.post(
      `${BASE_URL}/create-form/${STATIC_SPONSORED_MEMBER_ID}`, // Changed from query to URL parameter
      testInterventionData
    );
    
    console.log('✅ Form created successfully!');
    console.log('Status:', response.status);
    console.log('Created Form ID:', response.data._id);
    
    // Save the form ID for other tests
    return response.data._id;
  } catch (error) {
    console.error('❌ Error creating form:', error.response?.data || error.message);
    return null;
  }
}

async function testGetForm(formId) {
  try {
    console.log('\n--- Testing GET Financial Intervention Form ---');
    if (!formId) {
      console.log('⚠️ No form ID available. Skipping test.');
      return;
    }
    
    const response = await axios.get(
      `${BASE_URL}/viewform/${STATIC_SPONSORED_MEMBER_ID}/${formId}`
    );
    
    console.log('✅ Form retrieved successfully!');
    console.log('Status:', response.status);
    console.log('Form Data:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('❌ Error retrieving form:', error.response?.data || error.message);
  }
}

async function testGetAllForms() {
  try {
    console.log('\n--- Testing GET ALL Financial Intervention Forms ---');
    const response = await axios.get(
      `${BASE_URL}/getAllForms/${STATIC_SPONSORED_MEMBER_ID}`
    );
    
    console.log('✅ All forms retrieved successfully!');
    console.log('Status:', response.status);
    console.log('Number of Forms:', response.data.length);
    console.log('Form IDs:', response.data.map(form => form._id));
  } catch (error) {
    console.error('❌ Error retrieving all forms:', error.response?.data || error.message);
  }
}

// Run the tests
async function runTests() {
  console.log('=== STARTING API TESTS ===');
  console.log(`Using Sponsored Member ID: ${STATIC_SPONSORED_MEMBER_ID}`);
  
  // First create a form
  const formId = await testCreateForm();
  
  // Then test getting that specific form
  await testGetForm(formId);
  
  // Finally test getting all forms
  await testGetAllForms();
  
  console.log('\n=== TESTS COMPLETED ===');
}

runTests();