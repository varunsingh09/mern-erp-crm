const express = require("express");
const { createServer } = require("http");
const socketIO = require("socket.io");

const app = express();
const server = createServer(app);
const io = socketIO(server, {
    transports: ['polling'],
    cors: {
        cors: {
            origin: "http://localhost:3000"
        }
    }
})

io.on('connection', (socket) => {
    console.log('A user is connected with socket IO indexjs');

    socket.on('message', (message) => {
        console.log(`message from ${socket.id} : ${message}`);
    })

    socket.on('disconnect', () => {
        console.log(`socket ${socket.id} disconnected`);
    })
})

module.exports = {
    io,
    server,
    app,
    express
}