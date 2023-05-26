import { parseISO } from 'date-fns'
import { Router } from 'express'
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async(request, response) => {
  const repository = new AppointmentsRepository()
  const appointments = await repository.find()
  return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService()
  const appointment = await createAppointment.execute({provider_id, date: parsedDate})

  return response.json(appointment)
})

export default appointmentsRouter
