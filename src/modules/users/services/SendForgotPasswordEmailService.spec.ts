import AppError from '@shared/errors/AppError'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeMailProvider = new FakeMailProvider()

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider)

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com'
    })

    expect(sendMail).toHaveBeenCalled()
  })

})

