import io from 'socket.io-client';
const socket = io('http://localhost:8000');

function subscribeToCharge(cb) {
    socket.on('mph', data => cb(null, data));
}
function subscribeToConnection(cb){
    socket.on('connect', data => cb(null, data));
    socket.on('reconnecting', data => cb(null, data));
}
export { subscribeToTimer };