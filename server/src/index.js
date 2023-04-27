const bodyParser = require('body-parser');
const devRoutes = require('./routes/dev.route');
const authRoutes = require('./routes/auth.route');
const express = require('express');
const mongoInit = require('./config/mongo.init');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
require('dotenv').config();

mongoInit();

app.use('/', devRoutes);
app.use('/auth', authRoutes);

let interval;
let temp_value = 0;

const socketIO = require('socket.io')(http, {
  cors: {
      origin: '*'
  }
});

socketIO.on("connection", (socket) => {
  console.log(`⚡${socket.id} : new user connected!`);
  if (interval) {
    clearInterval(interval);
  }

  socket.on('temp_sender', (data) => {
    // console.log(`Relaying temp value: ${data}`);
    socketIO.emit('temp_receiver', data);
  });

  socket.on('pulse_sender', (data) => {
    // console.log(`Relaying pulse value: ${data}`);
    socketIO.emit('pulse_receiver', data);
  });

  socket.on('spo2_sender', (data) => {
    // console.log(`Relaying spo2 value: ${data}`);
    socketIO.emit('spo2_receiver', data);
  });

  socket.on('join', (data) => {
    socket.join(data.room);
    console.log(`Socket ${socket.id} connected to room ${data.room}`);
  });
  
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

http.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening on ${process.env.SERVER_PORT}`);
});