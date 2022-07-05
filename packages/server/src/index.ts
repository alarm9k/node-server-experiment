import net from 'net';

const port = 9100;
const host = '127.0.0.1';

const server = net.createServer();

server.listen(port, host, () => {
    console.log(`Server is running on port ${port}`);
});

let sockets: net.Socket[] = [];

server.on('connection', sock => {
    console.log(`CONNECTED: ${sock.remoteAddress}:${sock.remotePort}`);
    sockets = [...sockets, sock];

    sock.on('data', data => {
        console.log(`DATA: ${sock.remoteAddress}: ${data.length} bytes`);
    });

    sock.on('close', () => {
        sockets = sockets.filter(socket => socket !== sock);
        console.log(`CLOSED: ${sock.remoteAddress}:${sock.remotePort}`);
    });
})