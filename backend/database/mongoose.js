const mongoose = require('mongoose')

mongoose.Promise = global.Promise // Handle async calls

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1:27017/fakeDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((error) => console.log(error))

module.exports = mongoose
