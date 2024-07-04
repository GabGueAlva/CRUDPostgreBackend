const express = require('express')
const cors = require("cors")

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

//route
app.use(require('./routes/index'))


app.listen(4000)
console.log('Server on port 4000')