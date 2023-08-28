const express = require("express");
const mongoose = require("mongoose");

const schema= new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        require:true
    },
    profileimg:{
        type:Buffer
    }


}, {timestamps: true} );

const result = mongoose.model("clgmultimedia" , schema);

module.exports = result;