var express = require('express');
var router = express.Router();
var User = require('./index')

/* GET users listing. */
router.post('/', function(req, res, next) {
  new User().editUserData(req, res)
});
module.exports = router;
