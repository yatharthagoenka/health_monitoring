const mongoose = require('mongoose');
require('dotenv').config();

const mongoInit = () => {
    try{
        mongoose.connect(process.env.MONGO_CONN_URL);
        console.log('MongoDB connected')
    }catch(err){
        console.log(err);
        throw err;
    }
}

module.exports = mongoInit;