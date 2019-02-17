import io from 'socket.io-client';
const socket = io('https://api.matadormotorsports.racing/');

function subscribeToSpeed(cb) {
    socket.on('location', data => cb(null, data));
}
function subscribeToGPS(cb) {
    socket.on('location', data => cb(null, data));
}
function subscribeToConnection(cb){
    socket.on('connect', data => cb(null, data));
    socket.on('reconnecting', data => cb(null, data));
}
export { subscribeToSpeed, subscribeToGPS };