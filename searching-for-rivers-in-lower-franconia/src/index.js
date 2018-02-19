import * as d3 from "d3";
import * as topojson from "topojson";
import getSlug from "speakingurl";

const results = [
  ["albertshofen", "alzenau", "aschaffenburg", "bergrheinfeld", "buchbrunn", "buergstadt", "collenberg", "dettelbach", "dorfprozelten", "ebelsbach", "eibelstadt", "eisenheim", "elsenfeld", "eltmann", "erlabrunn", "erlenbach-a-main", "eussenheim", "faulbach", "frickenhausen-a-main", "gaedheim", "gemuenden-a-main", "gochsheim", "grafenrheinfeld", "grettstadt", "grossheubach", "grosswallstadt", "hafenlohr", "hasloch", "hassfurt", "himmelstadt", "kahl-a-main", "karbach", "karlstadt", "karlstein-a-main", "kitzingen", "kleinheubach", "kleinostheim", "kleinwallstadt", "klingenberg-a-main", "knetzgau", "kolitzheim", "kreuzwertheim", "laudenbach", "lohr-a-main", "mainaschaff", "mainstockheim", "margetshoechheim", "marktbreit", "marktheidenfeld", "marktsteft", "miltenberg", "neuendorf", "neustadt-a-main", "niedernberg", "nordheim-a-main", "obernburg-a-main", "ochsenfurt", "prosselsheim", "randersacker", "roden", "roellbach", "rothenfels", "roethlein", "sand-a-main", "schonungen", "schwarzach-a-main", "schweinfurt", "segnitz", "sennfeld", "sommerach", "sommerhausen", "stadtprozelten", "steinfeld", "stettfeld", "stockstadt-a-main", "sulzbach-a-main", "sulzfeld-a-main", "theres", "thuengersheim", "triefenstein", "veitshoechheim", "volkach", "waigolshausen", "winterhausen", "wipfeld", "wonfurt", "woerth-a-main", "wuerzburg", "zeil-a-main", "zell-a-main", "zellingen"],
  [],
  ['kirchzell']
];

d3.selectAll("svg").each(function() {

  const svg = d3.select(this);
  const id = +svg.attr("id");
  const path = d3.geoPath();

  d3.json("../json/lower-franconia.json", function(error, topology) {
    if (error) throw error;

    const g = svg.selectAll("path")
      .data(topojson.feature(topology, topology.objects.features).features)
      .enter()
      .append("g")
      .attr("class", d => {
        const feature = d.properties.feature + " ";
        const slug = getSlug(d.properties.name);
        const status = results[id].indexOf(slug) > -1 ? " active" : "";
        return feature + slug + status;
      });

    svg.selectAll(".river")
      .append("path")
      .attr("d", path)
      .style("stroke-width", d => { return d.properties.name == "Main" ? 3 : 1; })
      .append("title")
      .text(d => { return d.properties.name });

    svg.selectAll(".community")
      .append("path")
      .attr("d", path)
      .append("title")
      .text(d => { return d.properties.name });

    svg.selectAll(".marker")
      .append("text")
      .attr("transform", d => { return "translate(" + path.centroid(d) + ")"; })
      .text(d => { return d.properties.name });

    svg.selectAll(".active path")
      .transition()
      .delay(1500)
      .style("fill", "white");

    svg.append("circle")
      .transition()
      .delay(1500)
      .attr("cx", 557)
      .attr("cy", 280)
      .attr("r", results[id].length > 0 ? 0 : 70)
      .attr("class", "proximity");

    /* svg.on("mousedown.log", function () {
     cconsole.log(d3.mouse(this));
    }); */

  });
});
