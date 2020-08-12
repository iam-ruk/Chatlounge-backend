var express=require('express');
var socket =require('socket.io');
const PORT=process.env.PORT||4009;
var app=express();
var cors=require('cors');
var moongoose=require('mongoose');
var {Room,Message}=require('./room');
var router=require('./routes');
app.use(cors())

const dburl='mongodb+srv://iam_ruk:b9o7d4i0@chatcluster.t3z0l.mongodb.net/chatCluster-2?retryWrites=true&w=majority'
moongoose.connect(dburl)
.then((result)=>{
    var server=app.listen(PORT,()=>
        console.log(`listening at port ${PORT}`));
    var io=socket(server);
    app.use(express.json())
    app.use('/',router);

    io.on('connection',socket=>{
        let sender=null;
        let id1=null;
        socket.on('join',({user,room})=>{
            sender=user;
            const roomObj=new Room({
                owner:user,
                messages:[],
                users:[user],
                room:room
            });
            socket.join(roomObj._id);
            id1=roomObj._id;
            console.log(sender,id1,'join')
            roomObj.save()
            .then((result)=>{
                socket.emit('ack',{id1});
            })
        })  
        socket.on('enter',({name,room_id})=>{
            sender=name;
            console.log(name);
            id1=room_id;
            console.log(sender,id1,'enter')
            Room.findById(room_id)
            .then((result)=>{
                console.log('hjh');
                socket.join(room_id);
            })
            .catch((err)=>{
                console.log('not found')
                socket.emit('error1','Room not found!')
        })
    })      
        socket.on('message',(message)=>{
            const m=new Message({
                text:message,
                sender:sender
            });
            io.to(id1).emit('message',m);
            Room.findById(id1).then((result)=>{
            result.messages.push(m);
            result.save();
        })
        })
    
    });
})
.catch(err=>console.log(err))
