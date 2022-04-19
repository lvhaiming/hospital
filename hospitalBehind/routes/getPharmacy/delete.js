var express = require('express');
var router = express.Router();
var Pharmacy = require('./index')

router.post('/', function(req, res, next) {
  new Pharmacy().deletePharmacyData(req, res)
});
module.exports = router;
