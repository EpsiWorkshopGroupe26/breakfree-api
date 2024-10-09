import vine from '@vinejs/vine'

/**
 * Validator for creating an emotion.
 *
 * This validator ensures that the `states` property is a string with a maximum length of 255 characters.
 *
 * @constant
 * @type {Validator}
 */
export const createEmotionValidator = vine.compile(
  vine.object({
    states: vine.string().maxLength(255),
  })
)
/**
 * Validator for updating emotions.
 *
 * This validator ensures that the `states` field, if provided, is a string with a maximum length of 255 characters.
 *
 * @constant
 * @type {Validator}
 */
export const updateEmotionValidator = vine.compile(
  vine.object({
    states: vine.string().maxLength(255).optional(),
  })
)
