# API Routes Guide

## Case Report Page

### Core Details

### Family Members

**`GET :: api/cases/get-family-compositon/:caseID`**
* Function: Gets all family members of the spnsored member
* Connection: `frontend/src/fetch-connections/case-connection.jsx`, `fetchFamilyMembers`
* Route Parameters:
  * `caseID`: the OBJECT ID of the sponsored member
* Returns:
  * ` formattedFamilyMembers`: an array of object Family; fields are adjusted to match the frontend
    * `id`: object ID
    * `first`: first name
    * `middle`: middle name
    * `last`: last name
    * `name`: formatted full name 
    * `age`
    * `income`
    * `civilStatus`
    * `occupation`
    * `education`
    * `relationship`
    * `deceased`: True if "Deceased"

**`PUT :: api/cases/edit-family-composition/:caseID/:famID`**
* Function: Edits the chosen family member
* Connection: `frontend/src/fetch-connections/case-connection.jsx`, `updateFamilyMember(famID, updatedData)`
  * `updatedData` must have the same fields as the `returnData`; backend is already adjusted to cater this
  * `famID` is the OBJECT ID of the family member
* PUT Body: `updatedData`
* Route Parameters:
  * `caseID`: OBJECT ID of the sponsored member
  * `famID`: OBJECT ID of the family member
* Returns:
  * `returnData`: the updated family member; fields are adjusted to match the frontend
    * `id`: object ID
    * `first`: first name
    * `middle`: middle name
    * `last`: last name
    * `name`: formatted full name 
    * `age`
    * `income`
    * `civilStatus`
    * `occupation`
    * `education`
    * `relationship`
    * `deceased`: True if "Deceased"

**`PUT :: api/cases/add-family-member/:caseID`**
* Function: Adds a family member
* Connection: `frontend/src/fetch-connections/case-connection.jsx`, `addFamilyMember(updatedData)`
  * `updatedData` must have the same fields as the `returnData`
* PUT Body: `updatedData`
* Route Parameters:
  * `caseID`: OBJECT ID of the sponsored member
* Returns:
  * `returnData`: the updated family member; fields are adjusted to match the frontend
    * `id`: object ID
    * `first`: first name
    * `middle`: middle name
    * `last`: last name
    * `name`: formatted full name 
    * `age`
    * `income`
    * `civilStatus`
    * `occupation`
    * `education`
    * `relationship`
    * `deceased`: True if "Deceased"

**`PUT :: api/cases/delete-family-member/:caseID/:famID`**
* Function: Deletes a family member
* Connection: `frontend/src/fetch-connections/case-connection.jsx`, `deleteFamilyMember(famID)`
  * `famID`: OBJECT ID of the family member
* Route Parameters:
  * `caseID`: OBJECT ID of the sponsored member
  * `famID`: OBJECT ID of the family member
* Returns:
  * same as `GET :: api/cases/get-family-compositon/:caseID`

### Evalutaion, Problems, Observations, etc.

## Interventions

### Home Visitation Form

**`GET :: /api/intervention/home-visit-form/:caseID`**
* Function: Gets the necessary and saved details for home intervention; prepare for CREATE
* Connection: `frontend/src/fetch-connections/homeVisitation-connection.jsx`, `fetchCaseData(caseID)`
  * `caseID`: OBJECT ID of the sponsored member
* Route Parameters:
  * `caseID`: the OBJECT ID of the sponsored member
* Returns:
  * `case`
    * fields are same with the **SPONSORED MEMBER MODEL**
  * `father`
    * ...fields are same with the **FAMILY MEMBER MODEL**
    * relationship_to_sm
    * relationship_id
  * `mother`
    * ...fields are same with the **FAMILY MEMBER MODEL**
    * relationship_to_sm
    * relationship_id
  * `otherFamily`
    * ...fields are same with the **FAMILY MEMBER MODEL**
    * relationship_to_sm
    * relationship_id
* **NOTE**: 
  * for easier creating and editing, please store all family data in `rawFatherData`, `rawMotherData`, and `rawOtherFamilyData`

**`GET :: /api/intervention/home-visit-form/:caseID/:formID`**
* Function: Gets the necessary and saved details for home intervention; prepare for EDIT
* Connection: `frontend/src/fetch-connections/homeVisitation-connection.jsx`, `fetchFormData(caseID, formID)`
  * `caseID`: OBJECT ID of the sponsored member
  * `formID`: OBJECT ID of the home intervention form 
* Route Parameters:
  * `caseID`: the OBJECT ID of the sponsored member
  * `formID`: the OBJECT ID of the home intervention form
* Returns:
  * `case`
    * fields are same with the **SPONSORED MEMBER MODEL**
  * `father`
    * ...fields are same with the **FAMILY MEMBER MODEL**
    * relationship_to_sm
    * relationship_id
  * `mother`
    * ...fields are same with the **FAMILY MEMBER MODEL**
    * relationship_to_sm
    * relationship_id
  * `otherFamily`
    * ...fields are same with the **FAMILY MEMBER MODEL**
    * relationship_to_sm
    * relationship_id
* **NOTE**: 
  * for easier creating and editing, please store all family data in `rawFatherData`, `rawMotherData`, and `rawOtherFamilyData`

**`PUT :: /api/intervention/create/home-visit-form/:caseID`**
* Function: Creates a new home visitation intervention
* Connection: `frontend/src/fetch-connections/homeVisitation-connection.jsx`, `createHomeVis(createdData, caseID)`
  * `caseID`: OBJECT ID of the sponsored member
* Route Parameters:
  * `caseID`: the OBJECT ID of the sponsored member
* PUT Body: `createdData`
  * `grade_year_course`
  * `years_in_program`
  * `date`
  * `community`
  * `sponsor_name`
  * `family_type`
  * `sm_progress`
  * `family_progress`
  * *`rawFatherData`*
  * *`rawMotherData`*
  * *`rawOtherFamilyData`*
  * `sm_progress`
  * `family_progress`
  * `recommendation`
  * `agreement`
  * `observation_findings`
  * `interventions`
* Returns:
  * `form`
    * fields are same with the **HOME VISITATION FORM MODEL**
  * `case`
    * fields are same with the **SPONSORED MEMBER MODEL**
  * `father`
    * ...fields are same with the **FAMILY MEMBER MODEL**
    * relationship_to_sm
    * relationship_id
  * `mother`
    * ...fields are same with the **FAMILY MEMBER MODEL**
    * relationship_to_sm
    * relationship_id
  * `otherFamily`
    * ...fields are same with the **FAMILY MEMBER MODEL**
    * relationship_to_sm
    * relationship_id

**`PUT :: /api/intervention/edit/home-visit-form/:caseID/:formID`**
* Function: Saves the edited hoem intervention form
* Connection: `frontend/src/fetch-connections/homeVisitation-connection.jsx`, `editHomeVis(updatedData, caseID, formID)`
  * `updatedData`: object for PUT body
  * `caseID`: the OBJECT ID of the sponsored member
  * `formID`: the OBJECT ID of the home intervention form
* PUT Body: `updatedData`
  * `grade_year_course`
  * `years_in_program`
  * `date`
  * `community`
  * `sponsor_name`
  * `family_type`
  * `sm_progress`
  * `family_progress`
  * `sm_progress`
  * `family_progress`
  * `recommendation`
  * `agreement`
  * `observation_findings`
  * `interventions`
  * **NOTE**: family data is not needed since it will automatically be updated (logic happens at `GET :: /api/intervention/home-visit-form/:caseID/:formID`)
* Route Parameters:
  * `caseID`: the OBJECT ID of the sponsored member
  * `formID`: the OBJECT ID of the home intervention form
* Returns:
  * `form`
    * fields are same with the **HOME VISITATION FORM MODEL**
  * `case`
    * fields are same with the **SPONSORED MEMBER MODEL**
  * `father`
    * ...fields are same with the **FAMILY MEMBER MODEL**
    * relationship_to_sm
    * relationship_id
  * `mother`
    * ...fields are same with the **FAMILY MEMBER MODEL**
    * relationship_to_sm
    * relationship_id
  * `otherFamily`
    * ...fields are same with the **FAMILY MEMBER MODEL**
    * relationship_to_sm
    * relationship_id

## Other Forms

### Case Closure Form

**`GET :: /api/case-closure/${caseID}`**
* Function: Gets the necessary and saved detail for case closure; prepare for CREATE
* Connection: `frontend/src/fetch-connections/caseClosure-connection.jsx`, `fetchCaseData(caseID)`
* Route Parameters:
  * `caseID`: the OBJECT ID of the sponsored member
* Returns:
  * `caseSelected`
    * fields are same with the **SPONSORED MEMBER MODEL**

**`PUT :: /api/create/case-closure/${caseID}`**
* Function: Creates a new case closure
* Connection: `frontend/src/fetch-connections/caseClosure-connection.jsx`, `createCaseClosureForm(createdData, caseID)`
  * `caseID`: OBJECT ID of the sponsored member
  * `createdData`: the object containing the data needed
* PUT Body: `createdData`
  * `closure_date`
  * `reason_for_retirement`
  * `sm_awareness`
  * `sm_notification`
  * `evaluation`
  * `recommendation`
* Route Parameters:
  * `caseID`: the OBJECT ID of the sponsored member
* Returns:
  * `newCaseClose`
    * fields are same with the **CASE CLOSURE MODEL**