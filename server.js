var express = require('express');
var app = express();

// dont do this in production, they can see server.js
app.use(express.static(__dirname));

// sse.js is used to send events to client
var sse = require('./sse.js');
app.all('/feed', sse.handle);

setInterval(function(){console.log('sending');sse.send({time: new Date()})}, 1000);

app.listen(80);
console.log('started 80');