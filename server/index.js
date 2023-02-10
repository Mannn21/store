const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const port = process.env.PORT || 8800
const cors = require('cors')
const app = express()

const sequelize = require('./config/db.config')
sequelize.sync({force: false}).then(() => console.log("Database ready"))

const productEndpoint = require('./routes/products')
const userEndpoint = require('./routes/users')

app.use(cookieParser())
app.use(cors( { credentials: true, origin: 'http://localhost:3000' } ))
app.use(express.json())
app.use(express.static('public'))

app.use("/product", productEndpoint)
app.use('/user', userEndpoint)
app.listen(port, () => console.log(`SERVER RUNNING IN PORT ${port}...`))

