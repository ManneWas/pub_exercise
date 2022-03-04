const express = require('express')
const server = express()
server.use( express.json() ) // request json body

// start server
server.listen(3000, ()=>{
    console.log('server running at http://localhost:3000/data')
})

const sqlite3 = require('sqlite3')

const util = require('util')

const db = new sqlite3.Database('./database/Pub.db')
db.all = util.promisify(db.all)
db.run = util.promisify(db.run)

// Menuitems
server.get('/data/alcohol', async (request, response)=>{
    let result = await db.all("SELECT * FROM alcohol")
    response.json(result)
})

server.get('/data/storage', async (request, response)=>{
    let result = await db.all("SELECT * FROM storage")
    response.json(result)
})

server.get('/data/drink_menu', async (request, response)=>{
    let result = await db.all("SELECT * FROM drink_menu")
    response.json(result)
})

server.get('/data/drink_recep', async (request, response)=>{
    let result = await db.all("SELECT * FROM drink_recep")
    response.json(result)
})