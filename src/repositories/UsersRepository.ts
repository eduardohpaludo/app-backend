
import { AppDataSource } from '../database/data-source';
import User from '../models/User';

const UsersRepository = AppDataSource.getRepository(User)

export default UsersRepository
