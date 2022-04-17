var express = require('express');
var router = express.Router();
var Scheduling = require('./index')

router.post('/', function(req, res, next) {
  new Scheduling().getScheduling(req, res)
});
module.exports = router;
