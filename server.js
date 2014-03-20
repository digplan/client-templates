var express = require('express');
var app = express();
app.use(express.bodyParser());
app.use(express.static(__dirname));

var sockets = require('socket-server')({port: 81});

var sendall = function(){
  console.log("sending update");
  //var resp = '{"info": {"datetime": new Date()}}';
  sockets.sendAll({echo: echoval, info: {datetime: new Date()}});
}

setInterval(sendall, 2000);

var echoval = '';

app.post('/echo', function(r, s){
  console.log(r.body);
  echoval = r.body.echoval;
  console.log('echoval is', echoval);
  s.end('ok ' + echoval);
})

app.listen(80);

