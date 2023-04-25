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
  interval = setInterval(() => getTempApiAndEmit(socket), 1000);

  socket.on('message', (data) => {
    temp_value = data.text;
    console.log(`recv_client: ${data.text}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getTempApiAndEmit = socket => {
    const response = temp_value;
    socket.emit("FromAPI", response);
};

http.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening on ${process.env.SERVER_PORT}`);
});