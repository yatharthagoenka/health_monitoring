const User = require('./models/user.schema');
const socketIO = require('socket.io');

const handleSocketEvents = async (socket, info) => {
  console.log("sending message to "+info.to)
  
  const user = await User.findOne({ _id: info.to });
  const msg = info.text;
  if (user) {
    socket.to(info.to).emit('message', {
      username: user.username,
      msg,
    });
  }
}

module.exports = { handleSocketEvents };
