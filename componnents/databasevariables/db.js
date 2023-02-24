const express = require("express");
const student = require("./studentdb");

require('dotenv').config();
const mongoose = require("mongoose");
var i=0;

const connectDB =  {
  connection: async () => {
            await mongoose.set("strictQuery", false);
            await mongoose.connect("mongodb+srv://udityaprakash01:"+process.env.MONGODBPASS+"@cluster0.za5wk8j.mongodb.net/datingDB", (err) => {   
              if (!err) {
                console.log("db connected successfully");
                try{
                  student;
                }catch(err){
                  console.log("error in schema: "+err);
                  }
                } else {
                  console.log("Retrying connecting to database : " + i++);
                  connectDB.connection();
                }
              });
            }
            
          }
          
          
          module.exports=connectDB;