import vine from '@vinejs/vine'

/**
 * Validator for creating a motivation object.
 *
 * This validator ensures that the `states` field is a string with a maximum length of 255 characters,
 * and that the `support` and `consult` fields are boolean values.
 *
 * @constant
 * @type {Validator}
 */
export const createMotivationValidator = vine.compile(
  vine.object({
    states: vine.string().maxLength(255),
    support: vine.boolean(),
    consult: vine.boolean(),
  })
)

/**
 * Validator for updating motivation.
 *
 * This validator ensures that the `states` field is a string with a maximum length of 255 characters and is optional.
 * The `support` and `consult` fields are optional booleans.
 *
 * @constant
 * @type {Validator}
 */
export const updateMotivationValidator = vine.compile(
  vine.object({
    states: vine.string().maxLength(255).optional(),
    support: vine.boolean().optional(),
    consult: vine.boolean().optional(),
  })
)
