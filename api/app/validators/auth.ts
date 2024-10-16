import vine from '@vinejs/vine'

/**
 * Validator for user registration.
 *
 * This validator ensures that the following fields are validated:
 * - `email`: A string that is trimmed of whitespace, must be a valid email format, and must be unique in the `users` table.
 * - `password`: A string with a minimum length of 8 and a maximum length of 32.
 *
 * @constant
 * @type {Validator}
 */

export const registerValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (query, field) => {
        const user = await query.from('users').where('email', field).first()
        return !user
      }),
    password: vine.string().minLength(12).maxLength(32),
  })
)

/**
 * Validator for the login endpoint.
 *
 * This validator ensures that the `email` field is a valid email address and is trimmed of whitespace.
 * It also ensures that the `password` field is a string with a minimum length of 12 characters and a maximum length of 32 characters.
 *
 * @constant
 * @type {Validator}
 */
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim(),
    password: vine.string().minLength(12).maxLength(32),
  })
)
