var express = require('express');
var router = express.Router();
var Scheduling = require('./index')

router.post('/', function(req, res, next) {
  new Scheduling().getJobNum(req, res)
});
module.exports = router;
