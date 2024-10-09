import vine from '@vinejs/vine'

/**
 * Compiles a validator for mental health data.
 *
 * This validator ensures that the `symptoms` field is a boolean and the `stress` field is a number.
 *
 * @returns {Validator} A compiled validator for mental health data.
 */
export const createMentalHealthValidator = vine.compile(
  vine.object({
    symptoms: vine.boolean(),
    stress: vine.number(),
  })
)

/**
 * Validator for updating mental health information.
 *
 * This validator ensures that the `symptoms` field, if provided, is a boolean,
 * and the `stress` field, if provided, is a number.
 *
 * @constant
 * @type {Validator}
 */
export const updateMentalHealthValidator = vine.compile(
  vine.object({
    symptoms: vine.boolean().optional(),
    stress: vine.number().optional(),
  })
)
