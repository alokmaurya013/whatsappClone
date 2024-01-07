
import express  from 'express';
import cors from 'cors';
import Connection  from "./database/db.js";
import Routes from "./routes/Routes.js";
import bodyParser from "body-parser";
import { Server } from 'socket.io';

import dotenv from 'dotenv';
dotenv.config();
const app=express();
const PORT=process.env.PORT||8000;

Connection();

const server=app.listen(PORT,()=>console.log(`server is running successfully on PORT ${PORT}`));

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use('/',Routes);

const io=new Server(server,{
    cors:{
       origin:'https://whatsappclone013.netlify.app',
    },
})

let users=[];

const addUser=(userData,socketId)=>{
   !users.some(user=>user.sub===userData.sub)&&users.push({...userData,socketId});
}

const removeUser=(socketId)=>{
   users=users.filter(user=>user.socketId!==socketId);
}

const getUser=(userId)=>{
    return users.find(user=>user.sub===userId);
}
io.on('connection',(socket)=>{
    console.log('user connected')
    socket.on('addUser',userData=>{
        addUser(userData,socket.id);
        io.emit('getUsers',users);
    })
    socket.on('sendMessage',(data)=>{
        const user=getUser(data.receiverId);
        io.to(user.socketId).emit('getMessage',data);
    })
    socket.on('disconnect',()=>{
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers',users);
    })
})
