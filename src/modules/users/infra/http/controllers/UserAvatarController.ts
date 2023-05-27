import CreateUserService from "@modules/users/services/CreateUserService"
import { container } from "tsyringe"
import { Request, Response } from 'express'
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService"

export default class UserAvatarController{
  public async update(request: Request, response: Response): Promise<Response>{

    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename as string,
    })

    const updatedUser = {
      ...user,
      password: undefined
    }

    return response.json(updatedUser)
  }

}
