Simple client templating
========================

Render.js uses Hogan to render for client HTML templating, via--

JSON (via XHR) or    
JSONP (dynamic script load) or    
EventSource/SSE (Now being used instead of WebSockets!)    

This is an elegant, declarative solution for data exchange between browser/HTTP clients and servers, that uses HTTP and HTML/JS only.

####HTML
````
<!DOCTYPE html>

The time is {{ time }}

<!-- updates -->
<script x-updates='/feed' src='render.js'></script>

<!-- jsonp 
  <script x-jsonp='jsonp.js' src='render.js'></script>
-->

<!-- json
  <script x-json='data.json' src='render.js'></script>
-->

<!-- post (helpoer function)
  post(url, data, callback)
-->

````
