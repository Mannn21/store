const express = require('express')
require('dotenv').config()
const port = process.env.PORT
const cors = require('cors')
const app = express()

const sequelize = require('./config/db.config')
sequelize.sync().then(() => console.log("Database ready"))

const productEndpoint = require('./routes/products')

app.use(cors())
app.use(express.json())
app.use('/images', express.static('images'))

app.use("/", productEndpoint)
app.listen(port, () => console.log(port))

