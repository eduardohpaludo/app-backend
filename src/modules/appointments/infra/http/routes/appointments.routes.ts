import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'
import { parseISO } from 'date-fns'
import { Router } from 'express'
import { container } from 'tsyringe'
import AppointmentsController from '../controllers/AppointmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()
const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async(request, response) => {

  const appointments = await appointmentsRepository.find()
  return response.json(appointments)
})

appointmentsRouter.post('/', appointmentsController.create)

export default appointmentsRouter
