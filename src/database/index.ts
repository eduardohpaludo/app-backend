import AppDataSource from '../../app-data-source'

AppDataSource.initialize().then(() => {
  console.log('Data source has been initialized!')
}).catch((err) => {
  console.log('Error during Data Source initialization: ', err)
})
