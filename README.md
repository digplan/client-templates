#client-templates    
A collection of simple client-js helpers

##sse / render.js:
&lt;!DOCTYPE HTML>
The time is {{ time }}

function catchEvents(data){
  console.log('processing', data);
  return data;
}
&lt;script x-updates='/feed' x-process='catchEvents' src='render.js'></script>
&lt;script x-jsonp='jsonp.js' src='render.js'></script>
&lt;script x-json='data.json' src='render.js'></script>

##flav.js:
&lt;script src='flav.js' ></script>

$('#id')
renderht(data, prefunc);
load(url, cb);
get(url);  // yes, sync (normally POST and asnyc is best)
post(url, data, cb);
sse('/feed', function(obj));
