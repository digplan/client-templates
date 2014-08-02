#client-templates    
A collection of simple client-js helpers

##sse / render.js:
<pre>
&lt;!DOCTYPE HTML>
The time is {{ time }}

function catchEvents(data){
  console.log('processing', data);
  return data;
}
&lt;script x-updates='/feed' x-process='catchEvents' src='render.js'></script>
&lt;script x-jsonp='jsonp.js' src='render.js'></script>
&lt;script x-json='data.json' src='render.js'></script>
</pre>
##flav.js:
<pre>
&lt;script src='flav.js' ></script>

$('#id')
renderht(data, prefunc);
load(url, cb);
get(url);  // yes, sync (normally POST and asnyc is best)
post(url, data, cb);
sse('/feed', function(obj));

web components:

&lt;x-mycomponent name='world'>
&lt;script>
  function mycomponent(p, e){
  	return 'hello ' + p.name;
  }
&lt;/script>

</pre>

css.css
=======

For rapid templating and building of websites
CSS.css allows the rapid building of html pages using easily memorable classes. Included are simple classes for

Text colors (uses the great colors of http://clrs.cc/)
Background colors    
Margins and padding    
Column widths and heights in eighths of screen    
Push column right    
Full page image    
Center screen fixed element    
Fixed footer element    
Simple fades    
A basic tooltip    
Icons for github, twitter, email, facebook, google+    
Common text sizes    
Roboto and source code fonts    
Other common uses like left, right, float, etc..    
    
All in a single 1.8kb (before gzip) css file.  It enables a slow connection mobile friendly simple and single file that covers several common needs.

Examples: http://dpsw.info/css.css.html
