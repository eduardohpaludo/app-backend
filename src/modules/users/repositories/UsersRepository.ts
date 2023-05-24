
import { AppDataSource } from '../../../shared/infra/typeorm/data-source';
import User from '../infra/typeorm/entities/User';

const UsersRepository = AppDataSource.getRepository(User)

export default UsersRepository
