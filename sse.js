var clients = {};

module.exports = {

  handle: function(r, s){
    s.setHeader('Content-Type', 'text/event-stream');
    s.setHeader('Access-Control-Allow-Origin', '*');
    clients[r.cookies && r.cookies.t || Date.now()] = s;
  },

  send: function(cli, msg){
    if(typeof msg !== 'string')
      msg = JSON.stringify(msg);
    var c = clients;

    if(!msg){
      if(typeof cli !== 'string')
        cli = JSON.stringify(cli);
      for(i in c){
        c[i].write('data:'+cli+'\n\n');
  	  }
  	  return;
    }
    c[cli] && c[cli].write('data:'+msg+'\n\n');
  }

}