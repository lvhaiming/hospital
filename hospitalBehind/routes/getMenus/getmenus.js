var express = require('express');
var router = express.Router();
var GetMenus = require('./index')

/* GET users listing. */
router.post('/', function(req, res, next) {
  new GetMenus().getMenus(req, res)
});
module.exports = router;
