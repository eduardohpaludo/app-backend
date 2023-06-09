import 'reflect-metadata';
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import User from '@modules/users/infra/typeorm/entities/User'

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  provider_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id'})
  provider: User

  @Column('timestamp with time zone')
  date: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Appointment
