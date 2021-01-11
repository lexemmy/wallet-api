const express=require('express');
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');
require('dotenv').config();

var indexRouter = require('./routes/index');

// DB Config
const db = require('./config/config').MongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true , useCreateIndex: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


const app = express();
// app use
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json({strict: false}));
app.use(cookieParser());

app.use('/', indexRouter);

// listening port
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});