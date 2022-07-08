import net from 'net';
import {randomString} from './helpers';

const port = 9100;
const host = '127.0.0.1';

const client = net.createConnection(port, host, () => {
    console.log('Connected');

    setInterval(() => {
        client.write(randomString(100000), (err) => {
            console.log(`write: ${err ? String(err) : 'ok'}`);
        });
    }, 5000);
});

client.on('data', data => {
    console.log(`DATA: ${data}`);
});

client.on('close', () => {
    console.log('Connection closed');
});

client.on('error', () => {
    console.log('error');
})
