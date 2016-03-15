//serial-socket-server by Kris Linquist <kris@linquist.com>


var tcp_port = 9008;
var uniqueIdentifier = "serialDrone0";



var io = require('socket.io')(tcp_port);
console.log("serial-server listening on port " + tcp_port);
io.on('connection', function (socket) {
    console.log("Client connected.");
    socket.on(uniqueIdentifier, function (data) {
        var numOtherClients = Object.keys(io.sockets.sockets).length - 1;
        console.log("Messasge received: " + data + " emitting to " + numOtherClients + " other clients");
        socket.broadcast.emit(uniqueIdentifier, data);
    });
    socket.on('disconnect', function () {
        console.log("Client disconnected.")
    });
});