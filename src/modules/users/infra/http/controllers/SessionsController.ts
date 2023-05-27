import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response>{

    const { email, password } = request.body

    const authenticateUser = container.resolve(AuthenticateUserService)

    const { user, token } = await authenticateUser.execute({
      email,
      password
    })

    const responseAuth = {
      ...user,
      token,
      password: undefined
    }

    return response.json({ responseAuth })
  }
}
