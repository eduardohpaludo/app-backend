import CreateUserService from "@modules/users/services/CreateUserService"
import { container } from "tsyringe"
import { Request, Response } from 'express'

export default class UsersController{
  public async create(request: Request, response: Response): Promise<Response>{
    const { name, email, password } = request.body

    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute({
      name,
      email,
      password
    })

    const createdUser = {
      ...user,
      password: undefined
    }

    return response.json(createdUser)
  }

}
