import vine from '@vinejs/vine'

/**
 * Compiles a validation schema for general information using the `vine` library.
 *
 * The schema validates the following fields:
 * - `firstName`: A trimmed string with a maximum length of 100 characters.
 * - `name`: A string with a maximum length of 100 characters.
 * - `age`: A number.
 * - `genre`: A string with a maximum length of 150 characters.
 * - `situation`: A string with a maximum length of 255 characters.
 *
 * @returns {Validator} The compiled validation schema.
 */
export const createGeneralInformationValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().maxLength(100),
    name: vine.string().maxLength(100),
    age: vine.number(),
    genre: vine.string().maxLength(150),
    situation: vine.string().maxLength(255),
  })
)

/**
 * Validator for updating general information.
 *
 * This validator checks the following fields:
 * - `firstName`: An optional string with a maximum length of 100 characters, trimmed of whitespace.
 * - `name`: An optional string with a maximum length of 100 characters.
 * - `age`: An optional number.
 * - `genre`: An optional string with a maximum length of 150 characters.
 * - `situation`: An optional string with a maximum length of 255 characters.
 *
 * @constant
 * @type {Validator}
 */
export const updateGeneralInformationValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().maxLength(100).optional(),
    name: vine.string().maxLength(100).optional(),
    age: vine.number().optional(),
    genre: vine.string().maxLength(150).optional(),
    situation: vine.string().maxLength(255).optional(),
  })
)
