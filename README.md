Simple client templating
========================

Render.js uses Hogan to render for client HTML templating, via--

JSON (via XHR) or    
JSONP (dynamic script load) or    
EventSource/SSE (Now being used instead of WebSockets!)    

This is an elegant, declarative solution for data exchange between browser/HTTP clients and servers, that uses HTTP and HTML/JS only.

Included is sse.js, which provides client management and sending data (events) to clients.

x-updates points to the url providing the events
x-process [optional] is a callback function

A few helpers are added to window.

render(data); will redraw the page with new data
post(url, data, callback);  is for simple ajax needs
window['x-data']  holds the last retrived data
window['x-template']  holds the entire page template

####HTML
````
<!DOCTYPE html>

The time is {{ time }}

<!-- updates -->
<script x-updates='/feed' x-process='catchEvents' src='render.js'></script>

<!-- jsonp  <script x-jsonp='jsonp.js' src='render.js'></script>  -->
<!-- json  <script x-json='data.json' src='render.js'></scrip>t  -->
Hello {{name}}

<script>
  window['x-template'] = 'Goodbye {{name}}';  // change the template
  render();  // and render anew
  
  // refresh with new data
  post('/data.json', '', function(s){
    render(JSON.parse(s))l
  })
</script>
````
