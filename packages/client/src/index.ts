import net from 'net';
import {randomString} from './helpers';

const port = 9100;
const host = '127.0.0.1';

const client = net.createConnection(port, host, () => {
    console.log('Connected');
    client.write(randomString(100000));
    client.write(randomString(100000));
    client.write(randomString(100000));
    client.write(randomString(100000));
    client.destroy();
});

client.on('data', data => {
    console.log(`DATA: ${data}`);
});

client.on('close', () => {
    console.log('Connection closed');
});
