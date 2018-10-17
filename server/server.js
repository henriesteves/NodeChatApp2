const http = require('http')
const path = require('path')
const express = require('express')
const socketIO = require('socket.io')

const { generateMessage, generateLocationMessage } = require('./utils/message')
const { isRealString } = require('./utils/validation')
const { Users } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
// http://localhost:3000/socket.io/socket.io.js
const users = new Users()

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')
// console.log(__dirname + '/../public')
// console.log(publicPath)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected')

  // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
  //
  // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required')
    }

    socket.join(params.room)
    // socket.leave('room name')

    users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room)

    // io.emit // to all users => io.to('room name').emit()
    // socket.broadcast.emit // to all users expect the current user => socket.broadcast.to('room name').emit
    // socket.emit // emit a event to specific one user

    io.to(params.room).emit('updateUserList', users.getUserList(params.room))

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`))

    callback()
  })

  socket.on('createMessage', (message, callback) => {
    // console.log('createMessage', message)

    const user = users.getUser(socket.id)

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
    }

    // emits to all users connected
    // io.emit('newMessage', generateMessage(message.from, message.text))

    // callback('This is from the server')
    callback()

    // emits to all users except the sender
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  })

  socket.on('createLocationMessage', (coords) => {
    // io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))

    const user = users.getUser(socket.id)

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    }
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected')

    const user = users.removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room))
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
    }
  })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})