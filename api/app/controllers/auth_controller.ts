import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'

export default class AuthController {
  /**
   * Registers a new user.
   *
   * @param {HttpContext} context - The HTTP context containing the request and response objects.
   * @returns {Promise<void>} - A promise that resolves when the user is successfully created.
   *
   * @remarks
   * This method validates the incoming request using the `registerValidator` and creates a new user
   * with the validated payload. Upon successful creation, it returns a response with the created user.
   */
  async register({ request, response }: HttpContext): Promise<void> {
    const payload = await request.validateUsing(registerValidator)
    const user = await User.create(payload)
    return response.created(user)
  }

  async login({ request, response }: HttpContext): Promise<void> {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user, ['*'], {
      name: user.id.toString(), // Token name is the user ID
      //expiresIn: env.get('JWT_EXPIRES_IN'),
    })
    if (!token) {
      return response.badRequest({ message: 'Unable to create token' })
    }
    if (!user) {
      return response.badRequest({ message: 'Invalid credentials' })
    }
    return response.ok({
      token: token,
      ...user.serialize(),
    })
  }

  /**
   * Logs out the currently authenticated user by deleting their access token.
   *
   * @param {HttpContext} context - The HTTP context containing the authentication and response objects.
   * @returns {Promise<void>} - A promise that resolves when the logout process is complete.
   *
   * @throws {Error} - Throws an error if the user or token is not found.
   */
  async logout({ auth, response }: HttpContext): Promise<void> {
    if (!auth.isAuthenticated) {
      return response.unauthorized({ message: 'Not authenticated' })
    }
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken
    if (!token) return response.badRequest({ message: 'No token found' })
    await User.accessTokens.delete(user, token.identifier)
    return response.noContent()
  }
}
