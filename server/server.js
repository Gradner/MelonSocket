
/**
 * Module dependencies.
 */

var express = require('express')
  , path = require('path')

var app = express();
var http = require('http').createServer(app);

var io = require('socket.io');
var serv_io = io.listen(http);

// all environments
app.set('port', process.env.PORT || 5999);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

http.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var servername = "DevServ"
var users = [];

serv_io.sockets.on('connection', function (socket){

  socket.on('login', function(username, password){
    user = new Object();
    user.username = username;
    user.socketid = socket.id;
    users.push(user);
    console.log(users);
    socket.emit('completeLogin', socket.username, socket.id);
  });

  socket.on('disconnect', function(){
    delete users[socket.id];
    serv_io.sockets.emit('updateUserList', users);
    socket.broadcast.emit('newMessage', 'SERVER', socket.id + ' has disconnected');
  });

});
