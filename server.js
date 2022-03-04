const express = require('express')
const server = express()
server.use( express.json() )

// start server
server.listen(3000, () =>{
    console.log( 'Server is running at localhost:3000/data')
})

const sqlite3 = require ('sqlite3')

const db = new sqlite3.Database('./database/pub.db')
db.all = util.promisify(db.all)
db.run = util.promisify(db.run)

