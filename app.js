const express = require('express')
const bodyParser = require('body-parser')

const routes = require('./routes')

const app = express()

app.use(bodyParser.json())

app.use('/users', routes.users)

app.listen(3000, () => {
    console.log('Listening on Port 3000...')
})