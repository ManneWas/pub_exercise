const express = require('express')
const server = express()
server.use( express.json() )

// start server
server.listen(3000, () =>{
    console.log( 'Server is running at http://localhost:3000/data')
})

const sqlite3 = require ('sqlite3')
const util = require('util')
const db = new sqlite3.Database('./database/pub.db')
db.all = util.promisify(db.all)
db.run = util.promisify(db.run)


// Alcohol
server.get('/data/alcohol', async(request, response)=>{
    let result = await db.all("SELECT * FROM alcohol")

    response.json(result)
})

server.get('/data/alcohol/:item_id', async(request, response)=>{
    let result = await db.all("SELECT * FROM alcohol WHERE item_id = ?", [request.params.item_id])

    response.json(result)
})

server.post('/data/alcohol', async(request, response)=>{
    let result = await db.run("INSERT INTO alcohol (name, category) VALUES(?, ?)", [request.body.name, request.body.category])
    response.json(result)
})

server.put('/data/alcohol/:item_id', async(request, response)=>{

    let result = await db.run("UPDATE alcohol SET name = ?, category = ? WHERE item_id = ?", [request.body.name, request.body.category, request.params.item_id])
    response.json(result)
})

server.delete('/data/alcohol/:item_id', async(request, response)=>{

    let result = await db.run("DELETE FROM inventory WHERE item_id = ?", [request.params.item_id])
    response.json(result)
})

// drink_menu
server.get('/data/drink_menu', async(request, response)=>{
    let result = await db.all("SELECT * FROM drink_menu")

    response.json(result)
})

server.get('/data/drink_menu/:drink_id', async(request, response)=>{
    let result = await db.all("SELECT * FROM drink_menu WHERE drink_id = ?", [request.params.drink_id])

    response.json(result)
})

server.post('/data/drink_menu', async(request, response)=>{
    let result = await db.run("INSERT INTO drink_menu (name) VALUES(?)", [request.body.name])
    response.json(result)
})

server.put('/data/drink_menu/:drink_id', async(request, response)=>{

    let result = await db.run("UPDATE drink_menu SET name = ? WHERE drink_id = ?", [request.body.name, request.params.drink_id])
    response.json(result)
})

server.delete('/data/drink_menu/:drink_id', async(request, response)=>{

    let result = await db.run("DELETE FROM drink_menu WHERE drink_id = ?", [request.params.drink_id])
    response.json(result)
})

// drink_to_alcohol

server.get('/data/drink_to_alcohol', async(request, response)=>{
    let result = await db.all("SELECT * FROM drink_to_alcohol")

    response.json(result)
})

server.post('/data/drink_to_alcohol', async(request, response)=>{
    let result = await db.run("INSERT INTO drink_to_alcohol (qty_ml_drink) VALUES(?)", [request.body.name])
    response.json(result)
})


server.put('/data/drink_to_alcohol/:id', async(request, response)=>{

    let result = await db.run("UPDATE drink_to_alcohol SET name = ? WHERE id = ?", [request.body.name, request.params.id])
    response.json(result)
})

server.delete('/data/drink_to_alcohol/:id', async(request, response)=>{

    let result = await db.run("DELETE FROM drink_menu WHERE id = ?", [request.params.id])
    response.json(result)
})

// inventory
server.get('/data/inventory', async(request, response)=>{
    let result = await db.all("SELECT * FROM inventory")

    response.json(result)
})


server.post('/data/inventory', async(request, response)=>{
    let result = await db.run("INSERT INTO inventory (name) VALUES(?, ?)", [request.body.name])
    response.json(result)
})

server.put('/data/inventory/:id', async(request, response)=>{

    let result = await db.run("UPDATE inventory SET name = ? WHERE id = ?", [request.body.name, request.params.id])
    response.json(result)
})

server.delete('/data/inventory/:id', async(request, response)=>{

    let result = await db.run("DELETE FROM inventory WHERE id = ?", [request.params.id])
    response.json(result)
})
