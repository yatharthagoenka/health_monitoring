const router = require('express').Router();
const User = require('../models/user.schema');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.get('', async (req, res) => {
    const data = await User.find();
    console.log('auth hello')
    res.status(200).json({data});
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("User does not exist");
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Email or password is wrong");
    
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({user, token});
})

router.post('/register', async (req, res) => {
    const username = await User.findOne({ username: req.body.username });
    if (username) return res.status(400).send("User already exists");
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        username: req.body.username,
        password: hashPassword,
    });
    try {
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
})

router.delete('/delete/:id', async (req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete((req.params.userID));
        res.status(200).json({message: "User with id:"+req.params.id+"has been deleted"});
    }catch(err){
        console.log(err);
        res.status(400).json({message: "Error deleting user"});
    }
})

module.exports = router;