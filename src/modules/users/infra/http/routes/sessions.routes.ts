import { Router } from 'express'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import AppError from '@shared/errors/AppError'
import UsersRepository from '../../typeorm/repositories/UsersRepository'
import { container } from 'tsyringe'
import SessionsController from '../controllers/SessionsController'

const sessionsRouter = Router()
const sessionsController = new SessionsController()

sessionsRouter.post('/', sessionsController.create)

export default sessionsRouter
