import { startOfHour } from "date-fns";
import Appointment from "../infra/typeorm/entities/Appointment";
import AppointmentsRepository from "../infra/typeorm/repositories/AppointmentsRepository";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import AppError from "@shared/errors/AppError"

interface RequestDTO {
  provider_id: string
  date: Date
}

class CreateAppointmentService {

  public async execute({ provider_id, date }: RequestDTO): Promise<Appointment>{

    const appointmentDate = startOfHour(date)
    const repository = new AppointmentsRepository()
    console.log(repository)

    const findAppointmentInSameDate = await repository.findByDate(appointmentDate)

    if(findAppointmentInSameDate){
      throw new AppError('This appointment is already booked')
    }
    const appointment = repository.create({
      provider_id,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
