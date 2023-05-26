import { Router } from 'express'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import AppError from '@shared/errors/AppError'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

const sessionsRouter = Router()
const usersRepository = new UsersRepository()

sessionsRouter.post('/', async (request, response) => {

  const { email, password } = request.body

  const authenticateUser = new AuthenticateUserService(usersRepository)

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
})

export default sessionsRouter
