Simple client templating
========================

This is an elegant, declarative solution for data exchange between browser/HTTP clients and servers, that uses HTTP and HTML/JS only.

Data is automatically pulled from a JSON, JSONP, or Server sent event source specified in the script tag, and Hogan is used to render the page, which is a Hogan/Mustache template.    

Included is Server-side sse.js, which provides simple SSE functions for a Node server.    

####Script tag
x-updates points to the url providing the events    
x-process [optional] is a callback function    
####Window
render(data); will redraw the page with new data    
post(url, data, callback);  is for simple ajax needs    
window['x-data']  holds the last retrived data    
window['x-template']  holds the entire page template    

````
<!DOCTYPE HTML>

Hello {{name}}

<!-- sse  <script x-updates='/feed' x-process='catchEvents' src='render.js'></script> -->
<!-- jsonp  <script x-jsonp='jsonp.js' src='render.js'></script>  -->
<!-- json  <script x-json='data.json' src='render.js'></scrip>t  -->

<script>
  window['x-template'] = 'Goodbye {{name}}';  // change the template
  render();  // and render anew
  
  // refresh with new data
  post('/data.json', '', function(s){
    render(JSON.parse(s));
    //  render(JSON.parse(s), preprocess_func);  // preprocess the data, return null to abort processing
  })
</script>
````
