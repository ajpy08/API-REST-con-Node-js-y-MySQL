const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const connectionDB = require('./config/config').config().CONNECTION_DB;
const cors = require('cors')


const routes = require('./routes')

const app = express()
app.set('port', process.env.PORT || 9000)
const dbOptions = {
    host: connectionDB.host,
    port: connectionDB.port,
    user: connectionDB.user,
    password: connectionDB.password,
    database: connectionDB.database
}

// middlewares -------------------------------------
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(cors())

// routes -------------------------------------------
app.get('/', (req, res)=>{
    res.send('Welcome to my API')
})
app.use('/api', routes)

// server running -----------------------------------
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
})