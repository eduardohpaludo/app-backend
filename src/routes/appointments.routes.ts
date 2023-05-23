import { parseISO } from 'date-fns'
import { Router } from 'express'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async(request, response) => {
  const appointments = await AppointmentsRepository.find()
  return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
  try{
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()
    const appointment = await createAppointment.execute({provider_id, date: parsedDate})

    return response.json(appointment)
  } catch (err) {
    if(err instanceof Error) {
      return response.status(400).json({ error: err.message})
    }else {
      return response.status(500).json({ error: 'Internal server error'})
    }
  }
})

export default appointmentsRouter
