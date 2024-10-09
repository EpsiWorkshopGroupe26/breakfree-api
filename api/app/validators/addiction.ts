import vine from '@vinejs/vine'

/**
 * Validator for creating an addiction object.
 *
 * This validator ensures that the addiction object conforms to the following schema:
 * - `type`: A string with a maximum length of 200 characters.
 * - `frequency`: A string with a maximum length of 255 characters.
 * - `duration`: A string with a maximum length of 100 characters.
 * - `consequences`: A string with a maximum length of 255 characters.
 * - `weaning`: A string with a maximum length of 255 characters.
 *
 * @constant
 * @type {Validator}
 */
export const createAddictionValidator = vine.compile(
  vine.object({
    type: vine.string().maxLength(200),
    frequency: vine.string().maxLength(255),
    duration: vine.string().maxLength(100),
    consequences: vine.string().maxLength(255),
    weaning: vine.string().maxLength(255),
  })
)

/**
 * Validator for updating addiction details.
 *
 * This validator ensures that the provided addiction details conform to the specified schema.
 * Each field is optional and has a maximum length constraint.
 *
 * Fields:
 * - `type`: Optional string with a maximum length of 200 characters.
 * - `frequency`: Optional string with a maximum length of 255 characters.
 * - `duration`: Optional string with a maximum length of 100 characters.
 * - `consequences`: Optional string with a maximum length of 255 characters.
 * - `weaning`: Optional string with a maximum length of 255 characters.
 */
export const updateAddictionValidator = vine.compile(
  vine.object({
    type: vine.string().maxLength(200).optional(),
    frequency: vine.string().maxLength(255).optional(),
    duration: vine.string().maxLength(100).optional(),
    consequences: vine.string().maxLength(255).optional(),
    weaning: vine.string().maxLength(255).optional(),
  })
)
