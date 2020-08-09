var socket=io.connect('http://localhost:4005/');

var output=document.getElementById('output');
var user=document.getElementById('user');
var message=document.getElementById('message');
var button=document.getElementById('button');
var form=document.getElementById('form');
var feedback=document.getElementById('feedback');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    socket.emit('chat',{
        user:user.value,
        message:message.value     
    });
});
message.addEventListener('keypress',(e)=>{
    socket.emit('typing',user.value);
});
socket.on('chat',(data)=>{
    feedback.innerHTML="";
    output.innerHTML+=`<p>user:${data.user}</p> <p>message: ${data.message}</p>`;
});
socket.on('typing',(data)=>{
    feedback.innerHTML=`<p><em>${data} is typing...</em></p>`;
}
);