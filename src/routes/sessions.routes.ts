import { Router } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'
import AppError from '../errors/AppError'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  try{

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
  } catch (err) {
    if(err instanceof AppError) {
      return response.status(err.statusCode).json({ error: err.message})
    }else {
      return response.status(500).json({ error: 'Internal server error'})
    }
  }
})

export default sessionsRouter
