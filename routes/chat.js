module.exports = function(io) {
  var express = require('express');
  var moment = require('moment');
  var router = express.Router();
  var mongodb = require('mongodb');
  var MongoClient = mongodb.MongoClient;
  var mongo_url = process.env.MONGO_URL || 'mongodb://localhost:27017/chat';
  var assert = require('assert');

  /* GET chat room page. */
  router.get('/', function(req, res, next) {
    res.render('chat', { title: 'FSE Chat Room - ' + req.query.name , name: req.query.name});
  });

  io.on('connection', function(socket){
    MongoClient.connect(mongo_url, function(err, db) {
      db.collection('chat_record').find({}).sort(['time', 1]).forEach(function(doc) {
        var msg = {
          name: doc.name,
          time: moment(doc.time).format(),
          message: doc.message
        };
        socket.emit('message', msg);
      }, function(err) {
        assert.equal(null, err);
      })
    });
    // receive new message
    socket.on('message', function(raw_msg){
      var now = moment();
      var msg = {
        name: raw_msg.name,
        time: now.format(),
        message: raw_msg.message
      };
      io.emit('message', msg);
      MongoClient.connect(mongo_url, function(err, db) {
        assert.equal(null, err);
        msg.time = now.toDate();
        db.collection('chat_record').insertOne(msg, function(err, r) {
          assert.equal(null, err);
          assert.equal(1, r.insertedCount);
        });
        db.close();
      });
    });
  });

  return router;

}
