var express = require('express');
var app = express();

var login = require('./user/login');
var getUserData = require('./user/query');
var addUserData = require('./user/add');
var editUserData = require('./user/edit');
var deleteUserData = require('./user/delete');

var getMenus = require('./getMenus/getmenus');
var getAllMenus = require('./getMenus/getAllMenus');
var getPersonal = require('./getMenus/getPersonal');
var getPersonalTree = require('./getMenus/getPersonalTree');
var updateAuth = require('./getMenus/updateAuth');

var getPatientData = require('./getPatient/query');
var addPatientData = require('./getPatient/add');
var editPatientData = require('./getPatient/edit');
var deletePatientData = require('./getPatient/delete');
var getPatientAll = require('./getPatient/getPatientAll');

var getScheduling = require('./getScheduling/query');
var addScheduling = require('./getScheduling/add');
var editScheduling = require('./getScheduling/edit');
var getJobNum = require('./getScheduling/queryJobNum');

var getPharmacyData = require('./getPharmacy/query');
var addPharmacyData = require('./getPharmacy/add');
var editPharmacyData = require('./getPharmacy/edit');
var deletePharmacyData = require('./getPharmacy/delete');

var getBedData = require('./getBed/query');
var addBedData = require('./getBed/add');
var editBedData = require('./getBed/edit');
var deleteBedData = require('./getBed/delete');
var getBedAll = require('./getBed/getBedAll');
var getFloor = require('./getBed/getFloor');
var getRoom = require('./getBed/getRoom');
var getBedNum = require('./getBed/getBedNum');


app.use('/login', login);

app.use('/user/getUserData', getUserData);
app.use('/user/addUserData', addUserData);
app.use('/user/editUserData', editUserData);
app.use('/user/deleteUserData', deleteUserData);

app.use('/getMenus', getMenus);
app.use('/getAllMenus', getAllMenus);
app.use('/getPersonal', getPersonal);
app.use('/getPersonalTree', getPersonalTree);
app.use('/updateAuth', updateAuth);

app.use('/patient/getPatientData', getPatientData);
app.use('/patient/addPatientData', addPatientData);
app.use('/patient/editPatientData', editPatientData);
app.use('/patient/deletePatientData', deletePatientData);
app.use('/patient/getPatientAll', getPatientAll);

app.use('/scheduling/getScheduling', getScheduling);
app.use('/scheduling/addScheduling', addScheduling);
app.use('/scheduling/editScheduling', editScheduling);
app.use('/scheduling/getJobNum', getJobNum);

app.use('/pharmacy/getPharmacyData', getPharmacyData);
app.use('/pharmacy/addPharmacyData', addPharmacyData);
app.use('/pharmacy/editPharmacyData', editPharmacyData);
app.use('/pharmacy/deletePharmacyData', deletePharmacyData);

app.use('/bed/getBedData', getBedData);
app.use('/bed/addBedData', addBedData);
app.use('/bed/editBedData', editBedData);
app.use('/bed/deleteBedData', deleteBedData);
app.use('/bed/getBedAll', getBedAll);
app.use('/bed/getFloor', getFloor);
app.use('/bed/getRoom', getRoom);
app.use('/bed/getBedNum', getBedNum);

module.exports = app;