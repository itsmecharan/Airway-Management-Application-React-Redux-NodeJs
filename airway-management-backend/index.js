const express= require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/AirwayManagement';
const cors=require('cors');

const app =express();

mongoose.connect(url, {useNewUrlParser : true},{ useUnifiedTopology: true });
const conn = mongoose.connection;

conn.on('open', () =>{
    console.log("connected....");
})

app.use(cors());
app.use(express.json());


const router1= require('./routes/controller');
 app.use('/controller',router1);


app.listen('8184',() =>{
    console.log("Server Started......");
})