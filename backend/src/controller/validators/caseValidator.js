const Joi = require('joi');


const caseSchemaValidate = Joi.object({
  sm_number: Joi.number().required(),
  last_name: Joi.string().required(),
  first_name: Joi.string().required(),
  sex: Joi.string().required(),
  present_address: Joi.string().required(),
  dob: Joi.date().less('now').required(),
  pob: Joi.string().required(),
  civil_status: Joi.string().required(),
  edu_attainment: Joi.string().optional(),
  religion: Joi.string().optional(),
  occupation: Joi.string().optional(),
  contact_no: Joi.string().pattern(/^[0-9]{11}$/).optional(),
  problem_presented: Joi.string().required(),
  observation_findings: Joi.string().optional(),
  recommendation: Joi.string().optional(),
  interventions: Joi.array().items(Joi.string().hex().length(24)).optional(),
  history_problem: Joi.string().optional(),
  evaluation: Joi.string().optional(),
  assigned_sdw: Joi.string().hex().length(24).required(),
  is_active: Joi.boolean().required()
});

module.exports = caseSchemaValidate;