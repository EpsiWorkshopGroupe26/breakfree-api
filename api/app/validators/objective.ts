import vine from '@vinejs/vine'

/**
 * Validator for creating an objective.
 *
 * This validator ensures that the `description` field is a string with a maximum length of 255 characters,
 * and the `evolution` field is a number.
 *
 * @constant
 * @type {Validator}
 */
export const createObjectiveValidator = vine.compile(
  vine.object({
    description: vine.string().maxLength(255),
    evolution: vine.number(),
  })
)

/**
 * Validator for updating an objective.
 *
 * This validator ensures that the `description` field is an optional string with a maximum length of 255 characters,
 * and the `evolution` field is an optional number.
 *
 * @constant
 * @type {Validator}
 */
export const updateObjectiveValidator = vine.compile(
  vine.object({
    description: vine.string().maxLength(255).optional(),
    evolution: vine.number().optional(),
  })
)
