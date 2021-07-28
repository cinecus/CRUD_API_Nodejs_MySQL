var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({error:false,API_NAME:"clothes",writtenby:"cinecus"});
});

module.exports = router;
