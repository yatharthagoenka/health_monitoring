const User = require('../models/user.schema');
const express = require('express');
const userRouter = express.Router();
userRouter.use(express.json())
const { handleSocketEvents } = require('../socket');

userRouter.get('', (req, res) => {
    res.send('Server alive');
})

userRouter.get('/getAll', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send({ users });
    } catch (error) {
        res.status(500).send(error.message);
    }
})

userRouter.get('/getOne/:userID', async (req, res) => {
    const userID = req.params.userID;
    try {
      const user = await User.findById(userID);
      if (user) {
        res.status(200).send({ user });
      } else {
        res.status(404).send(`Unable to find matching user with userID: ${userID}`);
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
});

userRouter.patch('/update', async (req, res) => {
    const userID = req.query.userID;
    try {
      const user = await User.findById(userID);
      if (user) {
        const field = req.body.field;
        const value = req.body.value;
        const updatedUser = await User.updateOne({ _id: userID }, { [field]: value });
        res.status(200).json(updatedUser);
      } else {
        res.status(404).send(`Unable to find matching user with userID: ${userID}`);
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
});

module.exports = userRouter;