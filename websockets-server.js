var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];
var sub;
console.log('websockets server started');
ws.on('connection', function(socket) {
  console.log('client connection established');

if(sub != null){
  socket.send("*** Topic is '"+sub+"'");
}


  messages.forEach(function(msg) {
    socket.send(msg);
  });
  socket.on('message', function(data) {

if(data.startsWith("/topic")){
  sub = data.substring(6);
  data = "*** Topic has changed to '"+sub+"'";
}
else{
  messages.push(data);
}
console.log('message received: ' + data);

    ws.clients.forEach(function(clientSocket) {
      clientSocket.send(data)
    });
  });
});
