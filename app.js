const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const sequelize = require('./util/database')

const app = express()
app.use(bodyParser.json({ extended: false }))

app.use(cors())

const expenseRoutes=require('./routes/expense')



app.use(expenseRoutes)

sequelize.sync()
    .then(r => {

        app.listen(5000)
    })
    .catch(err => {
        console.log(err)
    })

