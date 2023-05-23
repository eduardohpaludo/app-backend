import express from 'express'
import routes from './routes'
import { AppDataSource } from './database/data-source'
import uploadConfig from './config/upload'

const app = express()
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

AppDataSource.initialize().then(() => {
  console.log('Data source has been initialized!')
  app.listen(3333, () => {
    console.log('Server is running on port 3333')
  })
}).catch((err) => {
  console.log('Error during Data Source initialization: ', err)
})


