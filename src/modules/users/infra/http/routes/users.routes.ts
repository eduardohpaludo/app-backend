import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'
import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

const usersRouter = Router()
const upload = multer(uploadConfig)
const usersRepository = new UsersRepository()

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body

  const createUser = new CreateUserService(usersRepository)

  const user = await createUser.execute({
    name,
    email,
    password
  })

  const createdUser = {
    ...user,
    password: undefined
  }

  return response.json(createdUser)
})

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async(request, response) => {
  console.log(request.file)
  try {
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository)

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename as string,
    })

    const updatedUser = {
      ...user,
      password: undefined
    }

    return response.json(updatedUser)
  } catch (err) {
      if(err instanceof Error) {
        return response.status(400).json({ error: err.message})
      }else {
        return response.status(500).json({ error: 'Internal server error'})
      }
  }
})

export default usersRouter
