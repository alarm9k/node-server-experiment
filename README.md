## What is this?
A combination of simple TCP server and client written in Node.js. The purpose is to demonstrate the behaviour of the operating system's network buffer and its connection to the socket "data" event in Node.js.

## How to run
To start the server, go to `packages/server` and do `yarn start`. The server starts with `nodemon` and restarts if the source code changes.

To start the client, go to `packages/client` and do `yarn start`. The client will connect to the server, send the data, and then exit. To send the data again you need to just re-run the client.

## What's going on here?
The "data" event on the Node.js socket is triggered when the operating system releases the data from the network buffer and passes it to the user application. Two conditions can trigger the buffer purge. One is when enough network data has been received and the buffer becomes full. In darwinOS the buffer is 64Kb. Another condition is when the buffer is not full yet but enough time has passed with no new data arriving. In this case the OS decides it doesn't make sense to wait any longer and releases the data to the user application right away.

What does this mean in practice:

- If we send 60Kb of data in a single write to the client, it will trigger a single "data" event on the receiving socket.
- If we send the same 60Kb of data by performing two writes to the client without any delay, it will still trigger a single "data" event on the receiving socket.
- If we send 60Kb of data by performing two writes to the client but with a 100ms timeout between the writes, it will trigger _two_ "data" events on the receiving socket, because the OS won't wait 100ms and will release the data from the network buffer right away.
- If we send 100Kb of data in a single write to the client, it will trigger two "data" events on the socket, because the network buffer on the receiving side will become full after receiving the first 64Kb. It will pass the data to the app, clear, and then receive and pass to the user app the remaining 36Kb of data.