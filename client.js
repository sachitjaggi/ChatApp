var http=require("http");
var client=require("socket.io-client");
var socket=client.connect("http://localhost:3000");
var readliner=require("readline");
const readline=readliner.createInterface({
    
    input:process.stdin,
    output:process.stdout,
    prompt:">>",

});

var message={};
let userName="";
readline.question(" Hi what is your Username ?",name=>
{
    userName=name;
    console.log(`it is a pleasure to see you !`);
    console.log();
    socket.emit("joined",name);
});
readline.on("line",function(data){
    var type=data.split(" ")[0];
    if(type=="private")
    {
        message.type="private",
        message.reciever=data.split(" ")[1];
        message.data=userName+"  :  "+data.split(" ").slice(2).join(" ");
    }
    else
    {
        message.type="public",
        message.data=userName+"  :  "+data;
    }
    socket.emit("message",message);
    readline.prompt();
});
socket.on("notice",function(data)
{
    console.log(data);
});
readline.on("close",
function(){
    console.log(`Thanks for using the chat app .`)
});