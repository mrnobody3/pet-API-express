const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require("dotenv").config();
// const contactsRouter = require('./routes/api')
const bookRouter = require('./routes/api/books')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.get('/api/test', (req, res)=>{
  res.json(null)
})
app.use('/api/book', bookRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
