import { Router } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'
import AppError from '../../../errors/AppError'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {

  const { email, password } = request.body

  const authenticateUser = new AuthenticateUserService()

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