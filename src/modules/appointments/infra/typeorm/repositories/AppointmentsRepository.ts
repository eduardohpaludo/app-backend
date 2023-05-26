import { Repository } from 'typeorm';
import Appointment from "../entities/Appointment";
import { AppDataSource } from '@shared/infra/typeorm/data-source';

// class AppointmentsRepository extends Repository<Appointment>{

//   public async findByDate(date: Date): Promise<Appointment | null> {

//     const findAppointment = await this.findOne({
//       where: { date }
//     })

//     return findAppointment || null
//   }

// }

const AppointmentsRepository = AppDataSource.getRepository(Appointment).extend({
  async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await AppointmentsRepository.findOne({
      where: { date }
    })

    return findAppointment || null
  }
})

export default AppointmentsRepository
