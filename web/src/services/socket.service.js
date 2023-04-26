import socketIO from 'socket.io-client';

export const socket = socketIO.connect(process.env.REACT_APP_API_URL);
