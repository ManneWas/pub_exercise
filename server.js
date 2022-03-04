const express = require('express')
const server = express()

server.use(express.json())

server.listen(3000,()=>{
    console.log('server running at http://localhost:3000')
})