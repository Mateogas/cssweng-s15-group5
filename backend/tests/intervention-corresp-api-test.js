const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:3000/api/interventions/correspondence';
// Replace with a valid Sponsored Member ObjectId from your database
const STATIC_SPONSORED_MEMBER_ID = '6849646feaa08161083d1aec';

// Test data for creating a correspondence intervention
const testCorrespData = {
  name_of_sponsor: 'John Doe',
  date_of_sponsorship: new Date().toISOString(),
  identified_problem: 'Needs educational support.',
  assesment: 'Family has limited resources.',
  objective: 'Provide scholarship.',
  recommendation: 'Enroll in scholarship program.',
  intervention_plans: [
    {
      action: 'Submit application',
      time_frame: 'Within 1 week',
      results: 'Application submitted'
    }
  ],
  progress_reports: []
};

// Test data for updating a correspondence intervention
const testUpdateData = {
  name_of_sponsor: 'Jane Smith',
  date_of_sponsorship: new Date().toISOString(),
  identified_problem: 'Needs medical support.',
  assesment: 'Medical expenses are high.',
  objective: 'Provide medical assistance.',
  recommendation: 'Refer to health center.',
  intervention_plans: [
    {
      action: 'Schedule checkup',
      time_frame: 'Within 3 days',
      results: 'Checkup scheduled'
    }
  ],
  progress_reports: []
};

async function testCreateForm() {
  try {
    console.log('\n--- Testing CREATE Correspondence Intervention Form ---');
    const response = await axios.post(
      `${BASE_URL}/create-form/${STATIC_SPONSORED_MEMBER_ID}`,
      testCorrespData
    );
    console.log('✅ Form created successfully!');
    console.log('Status:', response.status);
    console.log('Created Form ID:', response.data._id);
    return response.data._id;
  } catch (error) {
    console.error('❌ Error creating form:', error.response?.data || error.message);
    return null;
  }
}

async function testGetForm(formId) {
  try {
    console.log('\n--- Testing GET Correspondence Intervention Form ---');
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

async function testEditForm(formId) {
  try {
    console.log('\n--- Testing EDIT Correspondence Intervention Form ---');
    if (!formId) {
      console.log('⚠️ No form ID available. Skipping test.');
      return;
    }
    const response = await axios.put(
      `${BASE_URL}/edit-form/${formId}`,
      testUpdateData
    );
    console.log('✅ Form updated successfully!');
    console.log('Status:', response.status);
    console.log('Update Response:', JSON.stringify(response.data, null, 2));

    // Verify the changes were applied by getting the form again
    console.log('\n--- Verifying Form Update ---');
    const verifyResponse = await axios.get(
      `${BASE_URL}/viewform/${STATIC_SPONSORED_MEMBER_ID}/${formId}`
    );
    console.log('✅ Updated form retrieved!');
    console.log('Updated Form Data:', JSON.stringify(verifyResponse.data.form, null, 2));

    // Check if the update was applied correctly
    const updatedForm = verifyResponse.data.form;
    const updateSuccessful =
      updatedForm.name_of_sponsor === testUpdateData.name_of_sponsor &&
      updatedForm.identified_problem === testUpdateData.identified_problem;
    if (updateSuccessful) {
      console.log('✅ Update verification successful! Form data matches the update.');
    } else {
      console.log('❌ Update verification failed! Form data does not match the update.');
    }
  } catch (error) {
    console.error('❌ Error updating form:', error.response?.data || error.message);
  }
}

async function testGetAllForms() {
  try {
    console.log('\n--- Testing GET ALL Correspondence Intervention Forms ---');
    const response = await axios.get(
      `${BASE_URL}/getAllForms/${STATIC_SPONSORED_MEMBER_ID}`
    );
    console.log('✅ All forms retrieved successfully!');
    console.log('Status:', response.status);
    console.log('Number of Forms:', response.data.length);
    console.log('Forms:', response.data);
  } catch (error) {
    console.error('❌ Error retrieving all forms:', error.response?.data || error.message);
  }
}

// Run the tests
async function runTests() {
  console.log('=== STARTING CORRESPONDENCE API TESTS ===');
  console.log(`Using Sponsored Member ID: ${STATIC_SPONSORED_MEMBER_ID}`);

  // First create a form
  const formId = await testCreateForm();

  // Then test getting that specific form
  await testGetForm(formId);

  // Test editing the form
  await testEditForm(formId);

  // Finally test getting all forms
  await testGetAllForms();

  console.log('\n=== TESTS COMPLETED ===');
}

runTests();