/**
 * Creates a new Intervention Financial Assessment form for a sponsored member.
 * @param {string} caseId - The ObjectId of the Sponsored Member.
 * @param {object} formData - The data for the new financial intervention form.
 * @returns {Promise<object|null>} The newly created form object, or null on error.
 *   Returned variables in the form object:
 *     - _id: string
 *     - interventionType: string
 *     - type_of_assistance: string
 *     - other_assistance_detail?: string
 *     - area_and_subproject: string
 *     - problem_presented: string
 *     - recommendation: string
 *     - progress_reports: string[]
 *     - createdAt: string
 *     - updatedAt: string
 *     - __v: number
 */
export const createFinancialForm = async (caseId, formData) => {
    try {
        const response = await fetch(`/api/interventions/financial/create-form/${caseId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('API error');
        return await response.json();
    } catch (error) {
        console.error('Error creating financial form:', error);
        return null;
    }
};

/**
 * Fetches a specific Intervention Financial Assessment form and sponsored member info.
 * @param {string} caseId - The ObjectId of the Sponsored Member.
 * @param {string} formId - The ObjectId of the Intervention Financial Assessment form.
 * @returns {Promise<{sponsored_member: object, form: object}|null>}
 *   sponsored_member: { first_name, middle_name, last_name, sm_number, spu }
 *   form: { ...all form fields... }
 */
export const fetchFinInterventionData = async (caseId, formId) => {
    try {
        const response = await fetch(`/api/interventions/financial/viewform/${caseId}/${formId}`);
        if (!response.ok) throw new Error('API error');
        return await response.json();
    } catch (error) {
        console.error('Error fetching financial intervention data:', error);
        return null;
    }
};

/**
 * Fetches all financial intervention forms for a sponsored member.
 * @param {string} caseId - The ObjectId of the Sponsored Member.
 * @returns {Promise<Array<{id: string, intervention_number: number}>|null>}
 *   Returns an array of objects with:
 *     - id: string
 *     - intervention_number: number
 */
export const fetchAllFinInterventions = async (caseId) => {
    try {
        const response = await fetch(`/api/interventions/financial/getAllForms/${caseId}`);
        if (!response.ok) throw new Error('API error');
        return await response.json();
    } catch (error) {
        console.error('Error fetching interventions', error);
        return null;
    }
};

/**
 * Edits a specific Intervention Financial Assessment form.
 * @param {string} formId - The ObjectId of the form to edit.
 * @param {object} newData - The updated form data.
 * @returns {Promise<object|null>} The updated form object, or null on error.
 */
export const editFinancialForm = async (formId, newData) => {
    try {
        const response = await fetch(`/api/interventions/financial/edit-form/${formId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData),
        });
        if (!response.ok) throw new Error('API error');
        const result = await response.json();
        return result.form;
    } catch (error) {
        console.error('Error editing financial form:', error);
        return null;
    }
};

/**
 * Deletes an  financial form by formId.
 * @param {string} formId - The ObjectId of the correspondence form.
 * @returns {Promise<object|null>} The updated form object, or null on error.
 */
export const deleteCorrespInterventionForm = async(formId) => {
    try {
        const response = await fetch(`/api/interventions/financial/deleteform/${formId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('API error');
        const result = await response.json();
        return result.form;
    } catch (error) {
        console.error('Error deleting intervention financial plan:', error);
        return null;
    }
}