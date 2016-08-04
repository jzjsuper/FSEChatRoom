var express = require('express');
var router = express.Router();

router.all(function(req, res, next) {
  console.log("GOTCHA");
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chat', { title: 'FSE Chat Room' , name: req.query.name});
});

module.exports = router;
