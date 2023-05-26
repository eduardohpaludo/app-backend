import { compare } from "bcryptjs"
import UsersRepository from "../infra/typeorm/repositories/UsersRepository"
import User from "@modules/users/infra/typeorm/entities/User"
import { sign } from "jsonwebtoken"
import authConfig from "@config/auth"
import AppError from "@shared/errors/AppError"

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response>{
    const user = await UsersRepository.findOne({ where: { email } })

    if(!user) {
      throw new AppError('Incorret email/password combination.', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if(!passwordMatched) {
      throw new AppError('Incorret email/password combination.', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    return {
      user,
      token
    }
  }
}

export default AuthenticateUserService
