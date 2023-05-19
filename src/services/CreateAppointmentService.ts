import { startOfHour } from "date-fns";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import { AppDataSource } from "../database/data-source";

interface RequestDTO {
  provider: string
  date: Date
}

class CreateAppointmentService {

  public async execute({ provider, date }: RequestDTO): Promise<Appointment>{
    const appointmentRepository = AppDataSource.getRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await AppointmentsRepository.findByDate(date)

    if(findAppointmentInSameDate){
      throw Error('This appointment is already booked')
    }
    const appointment = appointmentRepository.create({
      provider,
      date: appointmentDate
    })
    return appointment
  }
}

export default CreateAppointmentService
