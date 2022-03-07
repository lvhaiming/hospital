var express = require('express');
var app = express();

var login = require('./user/login');
var getUserData = require('./user/query');
var addUserData = require('./user/add');
var editUserData = require('./user/edit');
var deleteUserData = require('./user/delete');

app.use('/login', login);
app.use('/user/getUserData', getUserData);
app.use('/user/addUserData', addUserData);
app.use('/user/editUserData', editUserData);
app.use('/user/deleteUserData', deleteUserData);

module.exports = app;