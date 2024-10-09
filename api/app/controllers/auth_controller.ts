import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'

export default class AuthController {
  async register({ request, response }: HttpContext): Promise<void> {
    const payload = await request.validateUsing(registerValidator)
    const user = await User.create(payload)
    const token = await User.accessTokens.create(user, ['*'], {
      name: user.id.toString(), // Token name is the user ID
      //expiresIn: env.get('JWT_EXPIRES_IN'),
    })
    return response.created({ user, token })
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

  async delete({ auth, response }: HttpContext): Promise<void> {
    if (!auth.isAuthenticated) {
      return response.unauthorized({ message: 'Not authenticated' })
    }
    const user = auth.getUserOrFail()
    await user.delete()
    return response.ok({ message: 'User deleted successfully' })
  }
}
