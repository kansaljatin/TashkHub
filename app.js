const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
require('./conn/conn')
const authRoutes = require('./routes/auth')
const listRoutes = require('./routes/list')

app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

//auth routes
app.use('/api/v1', authRoutes)

//list routes
app.use('/api/v1', listRoutes)

app.get('/', (req, res) => {
  app.use(express.static(path.resolve(__dirname, 'frontend', 'build')))
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
})

app.get('/', (req, res) => {
  res.send('Welcome to todo app')
})
app.listen(process.env.PORT, () => {
  console.log(`server started on ${process.env.PORT}`)
})
