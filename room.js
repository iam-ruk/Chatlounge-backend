const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const messageSchema=new Schema({
    text:{
      type:String,
      required:true
    },
    sender:{
        type:String,
        required:true
    },
    datetime:{
     type:String,
     required:true
    }
})

const roomSchema=new Schema(
    {
        owner:{
            type:String,
            required:true
        },
        messages:{
            type:[messageSchema],
            required:true
        },
        users:{
            type:[String],
            required:true
        },
        room:{
            type:String,
            required:true
        }
    },{timestamps:true});

    const Room=mongoose.model('Room',roomSchema);
    const Message=mongoose.model('Message',messageSchema);
    module.exports={Room,Message};