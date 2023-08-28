const express = require("express");
const mongoose = require("mongoose");

const schema= new mongoose.Schema({
    fullname : {
     type:String,
     min:8,
     required:true
    },
    instauname : {
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
    pnumber:{
      type:String,
      // match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    },
    gender:{
      type:Boolean,
      default:null
    },
    otp:{
      type:Number,
      default:null
    },
    options:[
      {
        instaid:{
          type:String
        },
        name:{
          type:String
        },
        priority:{
          type:Number
        }
      }   
   ],
    subscription:{
        exist:{
          type:Boolean,
          default:false
        },
        plan:{
          type:Number,
          default:1
        }
    },
    matchedwith:{
      instaid:{
        type:String,
        default:null,
      },
      name:{
        type:String,
        default:null,
      }
    },
    optionsaddedon:{
      type:Date,
    },
    profileurl:{
      type: String,
      default:"profile/default.png"
    },
    verified:{
      type:Boolean,
      default:false
    }
}, {timestamps: true} );

const result = mongoose.model("clgstudent" , schema);

module.exports = result;