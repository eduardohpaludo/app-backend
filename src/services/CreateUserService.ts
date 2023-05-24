import { hash } from "bcryptjs"
import User from "../models/User"
import UsersRepository from "../repositories/UsersRepository"
import AppError from "../errors/AppError"

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