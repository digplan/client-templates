Simple client templating
========================

Single file render.js uses Hogan to render document body template, via JSON (via XHR) or JSONP (dynamic script load).

####HTML
````
<!doctype html>

<body hidden>
 <div id='container'>
   Hello {{ name }} !
 </div>
</body>

<script x-json='data.json' src='render.js'></script>

<!--
  Use this for JSONP 
  <script x-jsonp='data.js?callback=render' src='render.js'></script>
  -->
````
