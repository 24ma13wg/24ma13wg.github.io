(function() {
  var args = [
    {
      "container": {
        "step": 10,
        "map": 1,
        "percent": "100%",
        "align": "xMinYMin",
        "width": 600,
        "height": 600
      },
      "projection": {
        "angle": 90,
        "rotate": {
          "lambada": 67,
          "phi": -58
        },
        "scale": 300
      }
    },
    {
      "container": {
        "step": 10,
        "map": 2,
        "percent": "50%",
        "align": "xMaxYMin",
        "width": 300,
        "height": 300
      },
      "projection": {
        "angle": 90,
        "rotate": {
          "lambada": 0,
          "phi": -90
        },
        "scale": 150
      }
    },
    {
      "container": {
        "step": 10,
        "map": 3,
        "percent": "50%",
        "align": "xMinYMin",
        "width": 300,
        "height": 300
      },
      "projection": {
        "angle": 90,
        "rotate": {
          "lambada": 0,
          "phi": 90
        },
        "scale": 150
      }
    },
    {
      "container": {
        "step": 20,
        "map": 4,
        "percent": "100%",
        "align": "xMinYMin",
        "width": 300,
        "height": 300
      },
      "projection": {
        "angle": 180,
        "rotate": {
          "lambada": -50,
          "phi": -35
        },
        "scale": 150
      }
    },
    {
      "container": {
        "step": 10,
        "map": 5,
        "percent": "100%",
        "align": "xMinYMin",
        "width": 300,
        "height": 300
      },
      "projection": {
        "angle": 90,
        "rotate": {
          "lambada": -104,
          "phi": -30
        },
        "scale": 400
      }
    }
  ];

  d3.select("article").style("position", "static");
  d3.select("#main-wrapper").style("position", "static");

  var projection = d3.geoOrthographic();

  d3
    .queue()
    .defer(d3.json, "https://cdn.rawgit.com/24ma13wg/24ma13wg.github.io/8284e2d17b71bb41b2a4faa6e41d47a3fd6325a2/bears/json/countries.json")
    .defer(d3.json, "https://cdn.rawgit.com/24ma13wg/24ma13wg.github.io/8284e2d17b71bb41b2a4faa6e41d47a3fd6325a2/bears/json/ranges.json")
    .await(function(error, countries, ranges) {
      if (error) throw error;

      render(args[0]);
      render(args[1]);
      render(args[2]);
      render(args[3]);
      render(args[4]);

      function render(args) {
        var step = args.container.step;
        var graticule = d3.geoGraticule().step([step, step]);

        var width = args.container.width,
          height = args.container.height,
          radius = width / 2;

        var svg = d3
          .select(".container-" + args.container.map + " svg")
          .attr("width", args.container.percent)
          .attr("height", args.container.percent)
          .attr("preserveAspectRatio", args.container.align + " meet")
          .attr("viewBox", "0 0 " + width + " " + height);

        projection
          .translate([radius, radius])
          .clipAngle(args.projection.angle)
          .rotate([args.projection.rotate.lambada, args.projection.rotate.phi])
          .scale(args.projection.scale);

        var path = d3.geoPath().projection(projection);

        svg
          .append("path")
          .datum({ type: "Sphere" })
          .attr("class", "sphere")
          .attr("d", path);

        svg
          .append("path")
          .datum(graticule)
          .attr("class", "graticule")
          .attr("d", path);

        svg
          .selectAll(".country")
          .data(topojson.feature(countries, countries.objects.areas).features)
          .enter()
          .append("path")
          .attr("class", function(d) {
            return d.id + " " + d.properties.area;
          })
          .attr("d", path);

        var range = svg.append("g").attr("class", "area");

        var tooltip = d3
          .select(".container-" + args.container.map)
          .append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

        range
          .selectAll(".range")
          .data(topojson.feature(ranges, ranges.objects.areas).features)
          .enter()
          .append("path")
          .attr("class", function(d) {
            return d.id + " " + d.properties.area;
          })
          .attr("d", path)
          .on("mouseover", function() {
            tooltip.transition()
              .duration(200)
              .style("opacity", .8);
          })
          .on("mousemove", function(d) {
            tooltip
              .text(d.properties.name)
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 25) + "px");
          })
          .on("mouseout", function() {
            tooltip.transition()
              .duration(500)
              .style("opacity", 0);
          });
      }
    });
})();
