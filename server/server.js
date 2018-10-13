const http = require('http')
const path = require('path')
const express = require('express')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
// http://localhost:3000/socket.io/socket.io.js

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')
// console.log(__dirname + '/../public')
// console.log(publicPath)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected')

  socket.emit('newMessage', {
    from: 'Lola',
    text: 'Hi',
    createdAt: '1233'
  })

  socket.on('createMessage', (message) => {
    console.log('createMessage', message)
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})