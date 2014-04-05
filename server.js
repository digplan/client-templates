require('uni');

var app = new Server();

app.get('/feed', function(r, s){

  s.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Transfer-Encoding': 'chunked'
  });

  setInterval(function(){
    s.write("data: {\"time\":" + Date.now() + "}\n\n");
  }, 1000);

});
