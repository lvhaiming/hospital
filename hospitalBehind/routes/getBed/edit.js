var express = require('express');
var router = express.Router();
var Bed = require('./index')

router.post('/', function(req, res, next) {
  new Bed().editBedData(req, res)
});
module.exports = router;
