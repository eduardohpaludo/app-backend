import 'reflect-metadata';
import User from "@modules/users/infra/typeorm/entities/User"
import UsersRepository from "../infra/typeorm/repositories/UsersRepository"
import AppError from "@shared/errors/AppError"
import IUsersRepository from "../repositories/IUsersRepository"
import { inject, injectable } from "tsyringe"
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider

  ){}

  public async execute({ email }: IRequest): Promise<void>{
    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido')
  }
}

export default SendForgotPasswordEmailService
