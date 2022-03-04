const express = require('express')
const server = express()
server.use(express.json())  

server.listen(3000, ()=>{
    console.log("server running at http://localhost:3000/data")
})

const sqlite3 = require('sqlite3')

const util = require('util')

const db = new sqlite3.Database('./database/pub.db')
db.all = util.promisify(db.all)
db.run = util.promisify(db.run)

//get list of alcohol
server.get('/data/alcohol', async(request, response)=>{
    let result = await db.all('SELECT * FROM alcohol')

    response.json(result)
})

//get record of alcohol
server.get('/data/alcohol/:item_id', async(request, response)=>{
    let result = await db.all('SELECT * FROM alcohol WHERE item_id = ?', [request.params.item_id])

    response.json(result)
})

//get list of all inventory
server.get('/data/inventory', async(request, response)=>{
    let result = await db.all('SELECT * FROM inventory')

    response.json(result)
})

//get record of inventory
server.get('/data/inventory/:item_id', async(request, response)=>{
    let result = await db.all('SELECT * FROM alcohol WHERE item_id = ?', [request.params.item_id])

    response.json(result)
})

//get list of all drinks
server.get('/data/drink_menu', async(request, response)=>{
    let result = await db.all('SELECT * FROM drink_menu')

    response.json(result)
})

//get record of drink
server.get('/data/drink_menu/:drink_id', async(request, response)=>{
    let result = await db.all('SELECT * FROM drink_menu WHERE drink_id = ?', [request.params.drink_id])

    response.json(result)
})