Serial Socket client and server by Kris Linquist <kris@linquist.com>

These two nodejs apps allow serial ports to communicate with each other over socket.io (http websockets).  I wrote this for a multirotor aircraft to send its telemetry data to software on a Windows laptop.


serial-socket-client runs on both the Windows laptop and a Raspberry Pi.
serial-socket-server runs on an Amazon EC2 server (or anything with a DNS name that is accessible to both clients)

I use pm2 to keep both server and client running after reboots.

Note that this traffic is not encrypted. Put behind a SSL termination reverse proxy (nginx/HAProxy) if you require secure communication.