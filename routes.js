var express=require('express');
const roomRouter = express.Router();
var {Room}=require('./room');

roomRouter.get('/:id' , async (req, res) =>{
    const id=req.params.id;
    Room.findById(id)
    .then(result=>{
        res.json(result.messages);
    })
    .catch(err=>{
        res.status(404)('error');
    })
    
})
module.exports=roomRouter;