var express = require('express');
var router = express.Router();
var User = require('./user')

/* GET users listing. */
router.post('/', function(req, res, next) {
  new User().deleteUserData(req, res)
});
module.exports = router;
