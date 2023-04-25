const express = require('express');
const mongoInit = require('./config/mongo.init');
const bodyParser = require('body-parser');
const devRoutes = require('./routes/dev.route');
const authRoutes = require('./routes/auth.route');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

mongoInit();

app.use('/', devRoutes);
app.use('/auth', authRoutes);

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server listening on port ' + process.env.SERVER_PORT);
})