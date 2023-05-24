import path from "path"
import UsersRepository from "../repositories/UsersRepository"
import uploadConfig from "../../../config/upload"
import fs from 'fs'
import User from "../entities/User"
import AppError from "../../../errors/AppError"

interface Request {
  user_id: string
  avatarFilename: string
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User>{
    const user = await UsersRepository.findOne({
      where: {
        id: user_id
      }
    })

    if(!user){
      throw new AppError('Only authenticated users can change avatar', 401)
    }

    if(user.avatar){
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if(userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename

    await UsersRepository.save(user)
    return user
  }
}

export default UpdateUserAvatarService
