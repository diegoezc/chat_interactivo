import { Socket } from "dgram";
import  Express  from "express";
import http from 'http'
import { Server as SocketServer } from "socket.io";


const app = Express();
const server = http.createServer(app)
const io = new SocketServer(server,{

})

io.on('connection', socket =>{
        console.log("esta funcionando")

        socket.on('message',(body)=>{
            socket.broadcast.emit('message', {
                body,
                from: socket.id.slice(6)
            })
        })
})

server.listen(3003)
console.log("hola")