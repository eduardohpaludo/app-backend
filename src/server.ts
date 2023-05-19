import express from 'express'
import routes from './routes'
import './database'
import { AppDataSource } from './database/data-source'

const app = express()
app.use(express.json())
app.use(routes)

AppDataSource.initialize().then(() => {
  console.log('Data source has been initialized!')
  app.listen(3333, () => {
    console.log('Server is running on port 3333')
  })
}).catch((err) => {
  console.log('Error during Data Source initialization: ', err)
})


