import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { Repository } from 'typeorm';
import Appointment from "../entities/Appointment";

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>

  constructor(){
    this.ormRepository = AppDataSource.getRepository(Appointment)
  }

  public async find(): Promise<Appointment[]> {

    const appointments = this.ormRepository.find()
    return appointments
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date }
    })

    return findAppointment || undefined
  }

  public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment>{
    const appointment = this.ormRepository.create({provider_id, date})

    await this.ormRepository.save(appointment)

    return appointment
  }
}



export default AppointmentsRepository
