const User = require('./models/user.schema');
const socketIO = require('socket.io');

const handleSocketEvents = async (socket, info, target) => {
  console.log("sending message to "+info.to)
  
  const user = await User.findOne({ _id: info.to });
  const value = info.value;
  if (user) {
    socket.to(info.to).emit(target, {
      username: user.username,
      value,
    });
  }
}

module.exports = { handleSocketEvents };
