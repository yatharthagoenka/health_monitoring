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

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

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
  });

  socket.on("temp_sender", async(info)=>{
    // console.log(info)
    handleSocketEvents(socket, info, "temp_receiver");
  })

  socket.on("pulse_sender", async(info)=>{
    // console.log(info)
    handleSocketEvents(socket, info, 'pulse_receiver');
  })

  socket.on("spo2_sender", async(info)=>{
    // console.log(info)
    handleSocketEvents(socket, info, 'spo2_receiver');
  })

  socket.on("message", async(info)=>{
    console.log(info)
    handleSocketEvents(socket, info);
  })

  socket.on('disconnect', () => {
    console.log(`⚡ ${socket.id} : user disconnected!`);
  });
});

app.post('/alert', async (req, res) => {
  console.log(req.body.data)
  const userID = req.body.userID;
  socketIO.to(userID).emit('alert', req.body.data);
  const user = await User.findById(userID);
  if(user){
    const payload = req.body.data;
    socketIO.to(userID).emit('alert', payload);
    const d = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const time = d.toLocaleString('en-US', options);
  
    var mailOptions = {
      from: 'awsconsole737@gmail.com',
      to: user.email,
      subject: `Alert : Fall detected : ${user.username}`,
      text: `A fall was detected through the remote device in place with user '${user.username}' at ${time}.\nCaution is adviced.\n\nRegards\nTeam Vitality  `
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.status(200).send(`Alert sent to gaurdian.`)
  }else {
    res.status(404).send(`Unable to find matching user with userID: ${userID}`);
  }
})

http.listen(process.env.SERVER_PORT, '0.0.0.0', () => {
  console.log(`Server listening on ${process.env.SERVER_PORT}`);
});