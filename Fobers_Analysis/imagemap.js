var width = 960,
    height = 500,
    color = d3.scale.category20b();


var svg = d3.select(".imagemap").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("xmlns", 'http://www.w3.org/2000/svg')
    .attr("xlink", 'http://www.w3.org/1999/xlink')
    .attr("version", '1.1');
    
function onRender() {   
          
     d3.select('.imagemap').select("svg")
       .remove();

       var svg = d3.select(".imagemap").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("xmlns", 'http://www.w3.org/2000/svg')
    .attr("xlink", 'http://www.w3.org/1999/xlink')
    .attr("version", '1.1');

    var treemap = d3.layout.treemap()
        .padding(0.5)
        .size([width, height])
        .sticky(true)
        .value(function(d) { return d.size })
        .children(function(d) {return d.values;});
    
d3.csv("forbers_list.csv", function(csv) {
    
    data_root = {"key":"treemap"};

    
     csv.forEach(function(o) {
      o.Age = parseInt(o.Age);
      o.Rank = parseInt(o.Rank);
      o.size = 72 - parseInt(o.Rank);
          });
          
             
      var nest = d3.nest()
        .key(function(d) { return d.Rank; })
        .entries(csv);

    data_root["values"] = nest
    
  var cell = svg.data([data_root]).selectAll("svg")
      .data(treemap.nodes)
    .enter().append("a")
      .attr("xlink:href",function(d) { return  d.url} )
      .attr("target","_blank").append("image")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", function(d) { return d.dx; })
      .attr("height", function(d) { return d.dy; })
      .attr("preserveAspectRatio", "defer xMidYMid slice")
      .style("stroke", '#ccc')
      .style("stroke-width", 0.5)
      .attr("xlink:href",function(d) { return d.image;} )
      .attr("sub_link",function(d) { return d.Name })
      .attr("data-title",function(d) { return '<p> Rank : '+d.Rank+'<br/>'+d.Name+' : '+d.Organization+'<p>'});
      
      $("image").tooltip({container: '.imagemap', html: true, placement:'top'});

    var lastsearch = '';
    var $box = {};
    
    function add_search(search, chart) {
      var $chart = $(chart);
      $(search).on('keypress, change, keyup', function() {
        var search = $(this).val();
        if (lastsearch != search) {
          lastsearch = search;
          var re = new RegExp(search, "i");
          $('image', $chart).each(function(){
              $(this).css('opacity', re.test($(this).attr("sub_link")) ? '1.0': '0.2');
          });
        }
      });
    }
    add_search('.search', '.imagemap');
      });
      }
      
(function hoverzoom() {
var svg = d3.select('svg');
d3.selectAll('image').on('mouseenter', function() {
var node = d3.select(this);
node.attr({
'data-w': node.attr('width'),
'data-h': node.attr('height')
});
node.attr({ width:200, height: 300 });
svg.append(function() { return node.remove().node(); });
}).on('mouseleave', function() {
var node = d3.select(this);
node.attr({
width: node.attr('data-w'),
height: node.attr('data-h')
})
});
})();
    