import { startOfHour } from "date-fns";
import Appointment from "../infra/typeorm/entities/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import { AppDataSource } from "../../../shared/infra/typeorm/data-source";
import AppError from "../../../errors/AppError"

interface RequestDTO {
  provider_id: string
  date: Date
}

class CreateAppointmentService {

  public async execute({ provider_id, date }: RequestDTO): Promise<Appointment>{

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await AppointmentsRepository.findByDate(appointmentDate)

    if(findAppointmentInSameDate){
      throw new AppError('This appointment is already booked')
    }
    const appointment = AppointmentsRepository.create({
      provider_id,
      date: appointmentDate
    })

    await AppointmentsRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
