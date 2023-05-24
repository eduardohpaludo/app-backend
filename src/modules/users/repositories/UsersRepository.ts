
import { AppDataSource } from '../../../shared/database/data-source';
import User from '../entities/User';

const UsersRepository = AppDataSource.getRepository(User)

export default UsersRepository
