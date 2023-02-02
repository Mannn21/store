const express = require('express')
require('dotenv').config()
const port = process.env.PORT
const cors = require('cors')
const app = express()

const sequelize = require('./config/db.config')
sequelize.sync().then(() => console.log("Database ready"))

const productEndpoint = require('./routes/products')
const userEndpoint = require('./routes/users')

app.use(cors())
app.use(express.json())
app.use('images', express.static('images'))
app.use('images', express.static('userImages'))

app.use("/product", productEndpoint)
app.use('/user', userEndpoint)
app.listen(port, () => console.log(port))

