var http=require("http");
var socket=require("socket.io");

var server=http.createServer(function(req,res){});
var socketServer=socket(server);
 var db={};

 socketServer.on("connect",function(socket){

    socket.on("joined",function(data){
        
        console.log(socket.id);
        console.log(data+` has joined`);

        db[data]=socket.id;
        socket.broadcast.emit("notice",data+" has joined the chat!");
    });
    socket.on("message",function(message){
        if(message.type=="private"){
            socketServer.to(`${db[message.reciever]}`).emit("notice",message.data);
        }
        else
        {
            socket.broadcast.emit("notice",message.data);
        }
    });
    socket.emit("notice",function(data){

    });
       

 });
 server.listen(3000,function(){
    console.log("Server is listening at port 3000");
});