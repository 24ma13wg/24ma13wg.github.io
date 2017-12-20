var svg = d3.select(".container-6").append("svg");

var sphere = svg
  .append("path")
  .datum({ type: "Sphere" })
  .attr("class", "sphere");

svg
  .append("path")
  .datum(d3.geoGraticule())
  .attr("class", "graticule");

var land = svg.append("path").attr("class", "land");

var range = svg.append("path").attr("class", "range");

var projection = d3.geoOrthographic().rotate([67, -58]);

var path = d3.geoPath().projection(projection);

function draw() {
  var clientWidth = document.getElementsByClassName("container-6")[0]
    .clientWidth;
  var width = Math.min(600, clientWidth), height = Math.min(600, clientWidth);
  projection.fitExtent([[0, 0], [width, height]], { type: "Sphere" });
  svg.attr("width", width).attr("height", height);
  svg.selectAll("path").attr("d", path);
}

d3.json("https://unpkg.com/world-atlas/world/110m.json", function(
  error,
  world
) {
  land
    .datum(topojson.feature(world, world.objects.land))
    .attr("opacity", 0)
    .transition()
    .duration(600)
    .attr("opacity", 1);
  draw();
});

d3.json(
  "https://cdn.rawgit.com/24ma13wg/24ma13wg.github.io/9011a3e2d6592d99a2f3ff6d9f35c374f0ffb1c5/bears/json/black-bears.json",
  function(error, ranges) {
    range
      .datum(topojson.feature(ranges, ranges.objects.areas))
      .attr("opacity", 0)
      .transition()
      .delay(1200)
      .duration(600)
      .attr("opacity", 1);
    draw();
  }
);

draw();

var inertia = d3.geoInertiaDrag(svg, draw);
d3.timer(function() {
  if (inertia.timer) return;
  var rotate = projection.rotate();
  projection.rotate([rotate[0] + 0.12, rotate[1], rotate[2]]);
  draw();
});
