const express = require("express");
const bodyparser = require("body-parser");
const bcrypt=require("bcrypt");
const cors = require("cors");
const app = express();
require('dotenv').config()
const db = require("./componnents/databasevariables/db")
const fs = require("fs");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors());

app.use('/profile',express.static('profileimg'));
app.use('/profile',express.static("public/images"));

db.connection();


//routes
app.use('/user',require('./routers/userrouter'));
app.use('/admin',require('./routers/adminrouter'));
// app.use('/instructor',require('./routers/instructorrouter'));

const port= process.env.PORT || 3000;

if(!fs.existsSync('./profileimg')){
  fs.mkdirSync('./profileimg');
}


app.get("/",(req,res)=>{
    res.json({
      status:200,
      msg:"success"
    });
});

app.listen(port ,()=>{
  console.log("server started "+port);
});