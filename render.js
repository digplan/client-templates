(function templ(){

  var d = document;

  var loadscript = function(href, cb){
    if(!href)
      throw Error('loadscript needs a URL');
    var script = d.body.appendChild(d.createElement('script'));
    script.onload = cb;
    script.src = href;
  };
  
  var loadjson = function(href, cb){
    if(!href)
      throw Error('loadjson needs a URL');
    var x = new XMLHttpRequest();
    x.open('GET', href, false);
    x.onload = cb;
    x.onprogress = cb;
    x.send();
  };

  window["x-template"] = null;
  window["x-data"] = null;
  
  window.render = function(data){
    window["x-data"] = data;
    window["x-template"] = window["x-template"] || d.body.innerHTML;
    d.body.innerHTML = Hogan.compile(window["x-template"]).render(data);
    d.body.hidden = false;
  };

  var tryUpdates = function(){
    var wsurl = d.querySelector('[x-updates]');
    if(!wsurl) return;
    wsurl = 'ws://' + location.host + wsurl.getAttribute('x-updates');
    var sock = new WebSocket(wsurl);
    sock.onmessage = function(e){
      if(typeof sock.id === 'undefined')
        return sock.id = e.data;

      var data = JSON.parse(e.data);
      for(i in data){
        window["x-data"][i] = data[i];
      }
      render(window["x-data"]);
    }
  }

  var hoganURL = '//cdnjs.cloudflare.com/ajax/libs/hogan.js/3.0.0/hogan.js';

  d.addEventListener('DOMContentLoaded', function(){
    loadscript(hoganURL, function getTemplate(){
      var isJSON = d.querySelector('[x-json]');
      var isJSONP = d.querySelector('[x-jsonp]');
      var getData = loadjson;
      var url = (isJSON && isJSON.getAttribute('x-json'));

      if(!url){
        var url = (isJSONP && isJSONP.getAttribute('x-jsonp'));
        getData = loadscript;
      }

      getData(url, function(data){
        if(data.target.response){
          var json = JSON.parse(data.target.response);
          render(json);
        }
      });

      tryUpdates();
    });
  });

  window.post = function(u, d, cb){
    var x = new XMLHttpRequest();
    x.open('POST', u, true);
    x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    x.onload = function(e){
      cb && cb(e.target.response);
    }
    x.send(d);
  }

})();
