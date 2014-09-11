var express = require('express');
var app = express();

// dont do this in production, they can see server.js
app.use(express.static(__dirname));

var sse = require('./sse.js');
app.all('/feed', sse.handle);
app.listen(801);
console.log('started 801');

require('./trends.js')(function(s){
  sse.send(s);
});
