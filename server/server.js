const http = require('http')
const path = require('path')
const express = require('express')
const socketIO = require('socket.io')

const { generateMessage, generateLocationMessage } = require('./utils/message')

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

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message)

    // emits to all users connected
    io.emit('newMessage', generateMessage(message.from, message.text))

    // callback('This is from the server')

    // emits to all users except the sender
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})