import { hash } from "bcryptjs"
import User from "@modules/users/infra/typeorm/entities/User"
import UsersRepository from "../infra/typeorm/repositories/UsersRepository"
import AppError from "@shared/errors/AppError"

interface Request {
  name: string
  email: string
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User>{
    const checkUserExists = await UsersRepository.findOne({
      where: { email }
    })

    if (checkUserExists) {
      throw new AppError('Email address already used')
    }

    const hashedPassword = await hash(password, 8)

    const user = UsersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    await UsersRepository.save(user)

    return user
  }
}

export default CreateUserService
