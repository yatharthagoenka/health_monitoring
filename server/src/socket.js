const User = require('./models/user.schema');
const socketIO = require('socket.io');
// const nodemailer = require('nodemailer');

const handleSocketEvents = async (socket, info, target) => {
  const user = await User.findOne({ _id: info.to });
  const value = info.value;

  // if(target==='spo2_receiver'){
  //   if (value < 90) {
  //     const userEmail = user.email;
  //     const mailOptions = {
  //       from: 'awsconsole737@gmail.com',
  //       to: userEmail,
  //       subject: 'SpO2 alert',
  //       text: `Hi ${user.username}, the SpO2 readings have dropped below 90%. Caution is advised..`,
  //     };
  //     const transporter = nodemailer.createTransport({
  //       host: "sandbox.smtp.mailtrap.io",
  //       port: 2525,
  //       auth: {
  //         user: "236964bb964695",
  //         pass: "dca07fc2170bc7"
  //       }
  //     });
  //     transporter.sendMail(mailOptions, function(error, info){
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         console.log('Email sent: ' + info.response);
  //       }
  //     });
  //   }
  // }

  if (user) {
    socket.to(info.to).emit(target, {
      username: user.username,
      value,
    });
  }
}

module.exports = { handleSocketEvents };
