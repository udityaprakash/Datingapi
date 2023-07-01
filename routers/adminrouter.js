const app = require("express").Router();
const result = require("../AdminPanel/home/match");
// const match = require("../AdminPanel/home/match");

app.get('/home',result.check);

app.post("/setDatabase",result.settingdata);

module.exports = app;