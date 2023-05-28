import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { Repository } from 'typeorm';
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";

class AppointmentsRepository implements IAppointmentsRepository {

  private appointments: Appointment[] = []

  public async find(): Promise<Appointment[]> {

  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {

  }

  public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment>{

  }
}



export default AppointmentsRepository
