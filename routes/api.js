var express = require('express');
var router = express.Router();
var king = require("../models/king");

/* GET battles all. */
router.get('/king', function(req, res, next) {
  king.get(res);
});

module.exports = router;
