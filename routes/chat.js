module.exports = function(io) {
  var express = require('express');
  var moment = require('moment');
  var router = express.Router();

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('chat', { title: 'FSE Chat Room' , name: req.query.name});
  });

  io.on('connection', function(socket){
    // receive new message
    socket.on('message', function(msg){
      msg.time = moment().format();
      io.emit('message', msg);
    });
  });

  return router;

}
