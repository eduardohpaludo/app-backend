//import { expect, it, describe } from 'vitest'
import AppError from '@shared/errors/AppError'
import AuthenticateUserService from './AuthenticateUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)

    expect(authenticateUser.execute({
      email: 'johndoe2@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(authenticateUser.execute({
      email: 'johndoe@example.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError)

  })


})

