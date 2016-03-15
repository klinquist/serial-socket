//serial-socket-client by Kris Linquist <kris@linquist.com>

var tcp_host = "serial.mutltirotor.com";
var tcp_port = 9008;
var serial_port = "/dev/cu.Bluetooth-Incoming-Port";
var serial_baudrate = 115200;
var uniqueIdentifier = "serialDrone0";


var socket = require('socket.io-client')('http://' + tcp_host + ':' + tcp_port);
var SerialPort = require("serialport");


SerialPort.list(function (err, ports) {
    var names = [];
    ports.forEach(function (port) {
        names.push(port.comName);
    });
    if (names.indexOf(serial_port) == -1) {
        console.log("Invalid serial port specified. Valid serial ports: " + JSON.stringify(names));
        process.exit(1);
    } else {
        listen();
    }
});


function listen() {
    var serialPort = new SerialPort.SerialPort(serial_port, {
        baudrate: serial_baudrate
    });
    socket.on('connect', function () {
        console.log("Connected to server.")
    });
    serialPort.on("open", function () {
        console.log('Connection to serial port ' + serial_port + ' open.');
    });
    serialPort.on('data', function (data) {
        console.log("Data received through serial port, forwarding to server: " + data);
        socket.send(uniqueIdentifier, data);
    });
    socket.on(uniqueIdentifier, function (data) {
        console.log("Data received from server, sending to serial port: " + data);
        serialPort.write(data, function (err, results) {
            if (err) {
                console.log("Error writing to serial port: " + err)
            } else {
                console.log("Successfully wrote to serial port: " + results);
            }
        });
    });
    socket.on('disconnect', function () {
        console.log("Connection with server lost.");
    });
}