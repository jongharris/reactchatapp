const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');
const router = require('./router');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const previousMessages = [];

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('join', ({name, room}, callback) => {
        //add user returns either error, or user
        const {error, user} = addUser({id: socket.id, name, room});

        if (error) return callback(error);

        socket.emit('message', {user: 'admin', text: `${user.name} welcome to the room ${user.room}`})
            //send message to everyone
        console.log(previousMessages);

        socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name}, has joined`});

        //if no errors, join the user in a room
        socket.join(user.room);
        io.to(user.room).emit('roomData,', {room:user.room, users: getUsersInRoom(user.room)});
        
        previousMessages.forEach(e=> {
            socket.emit('message', {user: e.user.name, text: e.message})
            console.log(e.message);
        });

        callback();
    });


    //sends the message do the entire room
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        //get the proper date
        var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')  
        if(previousMessages.length <= 200)
            previousMessages.push({user,message});
        else {
            //shift
            previousMessages.shift();
            previousMessages.push({user,message});
        }

        io.to(user.room).emit('message', {user: user.name, text: message + ' ' +  date});
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

        //do something on frontend after message is sent
        callback();
    });

    socket.on('disconnect', () => {
        console.log("User has disconnected.");
        const user = removeUser(socket.id);
        io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has exited the chat.`})
    });

});

app.use(router);
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

