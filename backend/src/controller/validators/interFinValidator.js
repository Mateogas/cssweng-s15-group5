const Joi = require('joi');

const interFinSchemaValidator = Joi.object({
  type_of_assistance: Joi.string()
    .valid(
      'Funeral Assistance to the family member',
      'Medical Assistance to Family Member',
      'Food Assistance',
      'IGP Capital',
      'Funeral Assistance to Sponsored Member',
      'Medical Assistance to Sponsored Member',
      'Home Improvement/Needs',
      'Other'
    )
    .required(),

  other_assistance_detail: Joi.string()
    .when('type_of_assistance', {
      is: 'Other',
      then: Joi.required(),
      otherwise: Joi.optional().allow('')
    }),

  area_and_subproject: Joi.string().required(),

  problem_presented: Joi.string().required(),

  recommendation: Joi.string().required(),

  progress_reports: Joi.array()
    .items(Joi.string().length(24).hex())
    .optional()
});

module.exports = interFinSchemaValidator;