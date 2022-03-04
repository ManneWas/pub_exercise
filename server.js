const express = require('express')
const server = express()

server.use( express.static('frontend'))
server.use( express.json())

server.listen(3000,() =>{
    console.log('connect to server at http://localhost:3000')
})

const sqlite3 = require('sqlite3')

// "promisify" = create promises for methods that are using callbacks
// why? because then we can use async/await syntax
const util = require('util')

const db = new sqlite3.Database('./database/PUB_PROJECT_JS.db')
db.all = util.promisify(db.all)
db.run = util.promisify(db.run)

server.get('/data/menuitems', async (request, response)=>{
    let result = await db.all("SELECT * FROM menuitems")
      response.json(result)
  })
  
server.post('/data/alcohol', async (request, response)=>{
    let result = await db.run("INSERT INTO menuitems (name) VALUES(?)", [request.body.name])
      response.json(result)
  })