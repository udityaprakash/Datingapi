const express = require("express");
const mongoose = require("mongoose");

const schema= new mongoose.Schema({
    fname : {
     type:String,
     min:8,
     required:true
    },
    lname : {
      type:String,
      min:8,
     },
    password: {
        type:String,
        min:8,
        require:true
       },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
          validator: function(v) {
              return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
          },
          message: "Please enter a valid email"
      },
      required: [true, "Email required"]
    },
    otp:{
      type:Number,
      default:null
    },
    verified:{
      type:Boolean,
      default:false
    }
});

const result = mongoose.model("clgstudent" , schema);

module.exports = result;