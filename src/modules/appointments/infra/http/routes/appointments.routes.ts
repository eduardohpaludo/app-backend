import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'
import { parseISO } from 'date-fns'
import { Router } from 'express'

const appointmentsRouter = Router()
const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async(request, response) => {

  const appointments = await appointmentsRepository.find()
  return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService(appointmentsRepository)
  const appointment = await createAppointment.execute({provider_id, date: parsedDate})

  return response.json(appointment)
})

export default appointmentsRouter
