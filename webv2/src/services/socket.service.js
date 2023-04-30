import socketIO from 'socket.io-client';
const userData = JSON.parse(localStorage.getItem('user'));
const token = userData.token;
export const socket = socketIO.connect(process.env.REACT_APP_API_URL, {
    auth: { token: token }
});
socket.emit("join", userData.user._id);