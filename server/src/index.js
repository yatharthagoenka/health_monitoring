const express = require('express');
const mongoInit = require('./config/mongo.init');
const bodyParser = require('body-parser');
const devRoutes = require('./routes/dev.route');
const authRoutes = require('./routes/auth.route');
const cors = require('cors');
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
require('dotenv').config();


app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

mongoInit();

app.use('/', devRoutes);
app.use('/auth', authRoutes);

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
    const response = new Date();
    socket.emit("FromAPI", response);
};    

server.listen(process.env.SERVER_PORT, () => console.log(`Listening on port ${process.env.SERVER_PORT}`));