var express = require('express');
var router = express.Router();
var Patient = require('./index')

router.post('/', function(req, res, next) {
  new Patient().addPatientData(req, res)
});
module.exports = router;