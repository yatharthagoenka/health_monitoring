const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const { handleSocketEvents } = require('./socket');
const express = require('express');
const mongoInit = require('./config/mongo.init');
const User = require('./models/user.schema');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const socketioJwt = require('socketio-jwt');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
require('dotenv').config();

mongoInit();

app.use('/user', userRoutes);
app.use('/auth', authRoutes);

const socketIO = require('socket.io')(http, {
  cors: {
      origin: '*'
  }
});

socketIO.on('connection', (socket) => {
  console.log(`⚡ ${socket.id} : new user connected!`);

  socket.on('join', async (userId) => {
    socket.join(userId);
    console.log(`Socket ${socket.id} connected to room ${userId}`);
    // handleSocketEvents(socket, userId);
  });

  socket.on("message", async(info)=>{
    console.log(info)
    handleSocketEvents(socket, info);
  })

  socket.on('disconnect', () => {
    console.log(`⚡ ${socket.id} : user disconnected!`);
  });
});

// socketIO.on("connection", (socket) => {
//   console.log(`⚡${socket.id} : new user connected!`);
//   if (interval) {
//     clearInterval(interval);
//   }

//   socket.on('temp_sender', (data) => {
//     // console.log(`Relaying temp value: ${data}`);
//     socketIO.emit('temp_receiver', data);
//   });

//   socket.on('pulse_sender', (data) => {
//     // console.log(`Relaying pulse value: ${data}`);
//     socketIO.emit('pulse_receiver', data);
//   });

//   socket.on('spo2_sender', (data) => {
//     // console.log(`Relaying spo2 value: ${data}`);
//     socketIO.emit('spo2_receiver', data);
//   });

//   socket.on('join', (data) => {
//     socket.join(data.room);
//     console.log(`Socket ${socket.id} connected to room ${data.room}`);
//   });
  
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });

http.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening on ${process.env.SERVER_PORT}`);
});