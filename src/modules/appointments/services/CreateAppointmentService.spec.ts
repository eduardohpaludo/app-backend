//import { expect, it, describe } from 'vitest'
import AppError from '@shared/errors/AppError'
import CreateAppointmentService from './CreateAppointmentService'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository()
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('123123')
  })

  it('should not be able to create two appointments on the same', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository()
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)

    const appointmentDate = new Date(2023, 5, 28, 18)

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123'
    })

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })


  // it('should not be able to create two appointments on the same', () => {
  //   expect(1 + 2).toBe(3)
  // })
})

