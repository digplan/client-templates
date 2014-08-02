// flav.js

if (!window.$)
    $ = document.querySelector.bind(document);

renderht = function(id, o) {
    var id = '#'+id,
        o = o;

    function inner() {
        console.log(id)
        $(id).innerHTML = Hogan.compile($(id).innerHTML).render(o);
        $(id).hidden = 0;
        return;
    }
    load('//cdnjs.cloudflare.com/ajax/libs/hogan.js/3.0.0/hogan.js', inner);
}

load = function(s, cb) {
    cb = cb || function() {};
    var css = s.match(/css$/);
    var i = document.body.appendChild(document.createElement(css ? 'link' : 'script'));
    i.onload = cb;
    if (css)
        css.rel = "stylesheet";
    i[css ? 'href' : 'src'] = s;
}

get = function(u) {
    var x = new XMLHttpRequest;
    x.open('GET', u, false);
    x.send();
    return x.responseText;
}

post = function(u, d, cb) {
    var x = new XMLHttpRequest;
    x.open('POST', u, true);
    x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    x.send(d);
    x.onload = function(r) {
        var resp = r.target.responseText;
        try {
            resp = JSON.parse(resp);
        } catch (e) {}
        (cb || console.log.bind(console))(resp);
    };
}

sse = function(url, cb) {
    var e = new EventSource(url);
    e.onmessage = function(resp) {
        var data = resp.data;
        try{
          data = JSON.parse(data);
        } catch(e){}
        cb(data);
    }
}

var es = document.getElementsByTagName('*');
var match = /^X\-(.*)/;
[].slice.call(es).map(function(e) {
    var nn = e.nodeName.match(match),
        p = {};
    if (!nn) return;
    console.debug(e.nodeName);
    [].slice.call(e.attributes).forEach(function(a) {
        p[a.nodeName] = a.nodeValue;
    })
    var func = window[nn[1].toLowerCase()];
    if (!func)
        return console.log('flava error: ' + nn[1] + ' is not defined');
    var o = func.call(window, p, e);
    typeof o === 'object' ? window[e.id] = o : e.innerHTML = o;
});

document.body.hidden = false;
