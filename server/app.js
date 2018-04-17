const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan');
require('dotenv').config()

//require from routes

//mongoose
const mongoose = require('mongoose')
const mongoDB = mongoose.connect('mongodb://localhost/blog');
mongoose.connect(mongoDB);
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connection to mongoose success')
});
 

//app use
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

//routes
const users = require('./routes/users.js')
app.use('/users', users)

app.listen(3000, () => console.log('listening on port 3000'))

module.exports = app
