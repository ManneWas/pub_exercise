const express = require('express')
const server = express()
server.use(express.json())  //request json body

//start server
server.listen(3000, ()=>{
    console.log("server running at http://localhost:3000/data")
})

const sqlite3 = require('sqlite3')

//"promisify" = create promises for methods that are using callbacks
//why? because then we can use async/await syntax
const util = require('util')

const db = new sqlite3.Database('./database/pub.db')
db.all = util.promisify(db.all)
db.run = util.promisify(db.run)

//get list of alcohol
server.get('/data/alcohol', async(request, response)=>{
    let result = await db.all('SELECT * FROM alcohol')

    response.json(result)
})