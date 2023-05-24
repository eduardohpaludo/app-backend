import express, { NextFunction, Request, Response } from 'express'
import routes from './routes'
import { AppDataSource } from '../typeorm/data-source'
import uploadConfig from '../../../config/upload'
import AppError from '../../errors/AppError'

const app = express()
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.error(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})

AppDataSource.initialize().then(() => {
  console.log('Data source has been initialized!')
  app.listen(3333, () => {
    console.log('Server is running on port 3333')
  })
}).catch((err) => {
  console.log('Error during Data Source initialization: ', err)
})


