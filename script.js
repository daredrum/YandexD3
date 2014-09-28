window.onload = function() {
  
  var n = 1000;
  var R = 2;
  var color = 'red';
  var timeout = 400;
  var svg = d3.select('body').append('svg');
  var svgWidth = document.querySelector('svg').clientWidth;
  var svgHeight = document.querySelector('svg').clientHeight;
  var svgOffset = document.querySelector('svg').getBoundingClientRect();
  var svgOffsetX = window.pageXOffset + svgOffset.left;
  var svgOffsetY = window.pageYOffset + svgOffset.top;
  var dots = [];
  var mouseX = -50;
  var mouseY = -50;
   
  init();
  
  setInterval(change, 50);
  
  svg.on('mousemove', function(e) {
    mouseX = d3.event.x;
    mouseY = d3.event.y;
  });
  
  svg.on('mouseleave', function(e) {
    mouseX = -50;
    mouseY = -50;
  });

  function init(){
    for (var i=0; i<n; i++) {      
        var coords = setCoords();
        dots[i] = {
            x: coords.x,
            y: coords.y,
            c: Math.round(20 + Math.random() * 10)
        };         
    } 
    svg.selectAll('circle')
    .data(dots)
    .enter()
    .append('circle')    
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('fill', color)
    .attr('r', R);
  }
  
  function refreshCoords(){
    for (var i=0; i<n; i++) {
      var signX = ((1 - Math.random() * 2) > 0) ? 1 : -1;
      var signY = ((1 - Math.random() * 2) > 0) ? 1 : -1;
      var sin = Math.random();
      var defx = Math.round(sin * dots[i]['c']);
      var defy = Math.sqrt(Math.pow(dots[i]['c'], 2) - Math.pow(defx, 2));
      var x = dots[i]['x'] + defx * signX;
      var y = dots[i]['y'] + defy  * signY;
      
      // Сheck block boundary SVG
      x = (x > (svgWidth - R)) ? (svgWidth - R) : (x < R) ? R : x;
      y = (y > (svgHeight - R)) ? (svgHeight - R) : (y < R) ? R : y;
      
      // Check near cursor
      cursorOffsetX = x - mouseX + svgOffsetX;
      cursorOffsetY = y - mouseY + svgOffsetY;
      if (-50 < cursorOffsetX && cursorOffsetX < 0) {
        if (-50 < cursorOffsetY && cursorOffsetY < 0) {
          x = cursorOffsetX - 100;
          y = cursorOffsetY - 100;
        }
        if (0 <= cursorOffsetY && cursorOffsetY < 50) {
          x = cursorOffsetX - 100;
          y = cursorOffsetY + 100;
        }
      }
      if (0 <= cursorOffsetX && cursorOffsetX < 50) {
        if (-50 < cursorOffsetY && cursorOffsetY < 0) {
          x = cursorOffsetX + 100;
          y = cursorOffsetY - 100;
        }
        if (0 <= cursorOffsetY && cursorOffsetY < 50) {
          x = cursorOffsetX + 100;
          y = cursorOffsetY + 100; 
        }
      }
      
      dots[i]['x'] = x; 
      dots[i]['y'] = y;
    }    
  }
  
  function change() {
    refreshCoords();
    svg.selectAll('circle')
    .data(dots)
    .transition()
    .duration(timeout)
    .delay(0)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('fill', function(d) {
      colorChange();
      return color;
    });
  }
  
  function colorChange() {
    var random = 0.5 - Math.random();
    color = (random > 0) ? 'yellow' : 'red'; 
  }
  
  function setCoords() {
      var result = {};
      
      result.x = Math.round(R + 1 + Math.random() * (svgWidth - 2 - 2*R));
      result.y = Math.round(R + 1 + Math.random() * (svgWidth - 2 - 2*R));   
      
      return result;
  }
  
}
