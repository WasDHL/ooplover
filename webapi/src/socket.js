// 'use strict';
// import socket from 'socket.io';

// export default 
import socket from 'socket.io';

export let IOInstance = null;

export const connect = function (server) {
    IOInstance = socket(server);

    IOInstance.on('connection', client => {
        console.log('connectioned');
    });

    return IOInstance;
}

export const getSocketIOInstance = function () {
    return IOInstance;
}

export const notifyClient = function (type, message) {
    var io = IOInstance;
    return io && io.emit(type, message);
}