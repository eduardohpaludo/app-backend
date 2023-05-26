
import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { Repository } from 'typeorm';
import User from '../entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor(){
    this.ormRepository = AppDataSource.getRepository(User)
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id }
    })

    return user || undefined
  }

  public async findByEmail(email: string): Promise<User | undefined>{
    const user = await this.ormRepository.findOne({
      where: { email }
    })

    return user || undefined
  }

  public async create({name, email, password}: ICreateUserDTO): Promise<User>{
    const user = this.ormRepository.create({name, email, password})

    await this.ormRepository.save(user)

    return user
  }

  public async save(user: User): Promise<User>{
    return this.ormRepository.save(user)
  }
}

export default UsersRepository
