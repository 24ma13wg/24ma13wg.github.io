// Load data.
d3.json("data.json").then(function (data) {

  // Globals.
  const width = 960;
  const legendHeight = 69;
  const dot = 16;
  const halfDot = dot / 2;
  const columnWidth = 150;
  const plotWidth = width - columnWidth * 2;
  const spacer = 5;
  const dotPlusSpacer = dot + spacer;
  const maxDots = Math.floor(plotWidth / dotPlusSpacer);
  const strokeWidth = 3;
  const rowHeight = 30;
  const footer = 40;
  const textHeight = 17;
  const headerHeight = 20;
  let skillCount = 0;
  let skillRowsOffset = 0;
  let categoryRowsOffset = 0;

  // All profiles chart.
  function all() {

    // Add SVG container.
    const svg = d3.select(".all")
      .append("svg")
      .attr("width", width);

    // Add legend
    const legend = svg.append("g")
      .attr("class", "legend");
    legend.append("rect")
      .attr("width", 478)
      .attr("height", legendHeight);

    // Add basic skills key.
    const basic = legend.append("g")
      .attr("transform", "translate(0, 50)");
    basic.append("circle")
      .attr("r", halfDot)
      .attr("cx", 56)
      .attr("cy", -25)
      .attr("class", "basic");
    basic.append("text")
      .attr("x", 17)
      .text("Basic skills");

    // Add project skills key.
    const project = legend.append("g")
      .attr("transform", "translate(120, 50)");
    project.append("circle")
      .attr("r", halfDot)
      .attr("cx", 56)
      .attr("cy", -25)
      .attr("class", "project");
    project.append("text")
      .attr("x", 11)
      .text("Project skills");

    // Add student key.
    const student = legend.append("g")
      .attr("transform", "translate(240, 50)");
    student.append("circle")
      .attr("r", halfDot)
      .attr("cx", 56)
      .attr("cy", -25)
      .attr("class", "student");
    student.append("text")
      .attr("x", 28)
      .text("Student");

    // Add teacher key.
    const teacher = legend.append("g")
      .attr("transform", "translate(360, 50)");
    teacher.append("circle")
      .attr("r", halfDot)
      .attr("cx", 56)
      .attr("cy", -25)
      .attr("class", "teacher");
    teacher.append("text")
      .attr("x", 27)
      .text("Teacher");

    // Nest data by category and by skill, and order everything alphabetcally.
    const nest = d3.nest()
      .key(d => d.category)
      .sortKeys(d3.ascending)
      .key(d => d.skill)
      .sortKeys(d3.ascending)
      .key(d => d.name)
      .sortKeys(d3.ascending)
      .entries(data);

    // Generate array of header labels.
    const headerLabels = nest.map(d => d.key);

    // Define scales with a range of categorical colours.
    const light = d3.scaleOrdinal(d3.schemePastel2)
      .domain(headerLabels);
    const dark = d3.scaleOrdinal(d3.schemeDark2)
      .domain(headerLabels);

    // Add category groups.
    const categories = svg.selectAll(".category")
      .data(nest)
      .enter()
      .append("g")
      .attr("transform", "translate(0, 120)");

    // Add category headers.
    categories.selectAll(".header")
      .data(d => d.values)
      .enter()
      .append("text")
      .attr("transform", d => translate(d, 'category'))
      .attr("class", (d, i) => i ? "empty" : "category")
      .text((d, i) => i ? "" : headerLabels.shift());
    d3.selectAll(".empty").remove();

    // Add skill groups.
    skillCount = 0;
    const skills = categories.selectAll(".skill")
      .data(d => d.values)
      .enter()
      .append("g")
      .attr("transform", d => translate(d, 'skill'));
    skills.append("text")
      .text(d => d.key)
      .attr("class", "skill");

    // Add skilled people.
    const people = skills.selectAll(".person")
      .data(d => d.values)
      .enter()
      .append("g")
      .attr("class", "person");
    people.append("circle")
      .attr("r", halfDot)
      .attr("cx", (d, i) => {
        const rowIndex = Math.ceil((i + 1) / maxDots) - 1;
        x = (i - (maxDots * rowIndex)) * dotPlusSpacer + columnWidth;
        return x;
      })
      .attr("cy", (d, i) => {
        const rowIndex = Math.ceil((i + 1) / maxDots) - 1;
        y = rowIndex * dotPlusSpacer - halfDot;
        return y;
      })
      .attr("fill", d => {
        let fill = light(d.values[0].category);
        if (d.values[0].project) {
          fill = dark(d.values[0].category);
        }
        if (d.values[0].teacher) {
          fill = "#555";
        }
        return fill;
      })
      .attr("stroke", d => {
        let stroke = light(d.values[0].category);
        if (d.values[0].project) {
          stroke = dark(d.values[0].category);
        }
        if (d.values[0].student) {
          stroke = "#555";
        }
        return stroke;
      })
      .attr("stroke-width", strokeWidth);
    people.append("title")
      .text(d => d.key);

    // Set container height.
    svg.attr("height", () => {
      canvasHeight = (skillCount * rowHeight) + (skillRowsOffset * dotPlusSpacer);
      return (legendHeight + (120 - legendHeight)) + canvasHeight + footer;
    });

    // Add event listener for change event.
    d3.selectAll("#filter").on("change", update);

    // Update global offset to push down succeeding rows by correct offset.
    function translate(d, column) {
      const increment = Math.ceil(d.values.length / maxDots) - 1;
      let offset;
      if (column === "category") {
        offset = categoryRowsOffset * dotPlusSpacer;
      }
      else {
        offset = skillRowsOffset * dotPlusSpacer;
      }
      let push = offset + ++skillCount * rowHeight;
      const width = column === "category" ? 0 : columnWidth;
      const translate = "translate(" + width + ", " + push + ")";
      if (column === "category") {
        categoryRowsOffset += increment;
      }
      else {
        skillRowsOffset += increment;
      }
      return translate;
    }

    // Filter people by project workers, students, or teachers.
    function update() {
      people.select("circle")
        .transition()
        .duration(300)
        .attr("r", d => {
          if (this.value === "project") {
            return d.values[0].project ? halfDot : 0;
          }
          else if (this.value === "student") {
            return d.values[0].student ? halfDot : 0;
          }
          else if (this.value === "teacher") {
            return d.values[0].teacher ? halfDot : 0;
          }
          else {
            return halfDot;
          }
        });
    }
  }

  // Personal profile chart.
  function personal() {

    // Add SVG container.
    const svg = d3.select(".personal")
      .append("svg")
      .attr("width", width)

      // @todo: Add dynamic height
      .attr("height", 510 + footer);

    const person = "Claire Bloggs";
    const profile = data.filter(d => {
      return d.name === person;
    });

    // Add person label.
    svg.append("text")
      .attr("y", textHeight)
      .text(person)
      .attr("class", "person");

    // Nest data by category and by skill, and order everything alphabetcally.
    const nest = d3.nest()
      .key(d => d.category)
      .sortKeys(d3.ascending)
      .entries(profile);

    // Add category groups.
    const categories = svg.selectAll(".category")
      .data(nest)
      .enter()
      .append("g")
      .attr("transform", (d, i) => {
        return "translate(" + columnWidth * i + ", " + rowHeight + ")";
      });
    categories.append("g")
      .attr("transform", "translate(0, " + headerHeight + ")")
      .append("text")
      .text(d => d.key)
      .attr("class", "category");

    // Generate array of header labels.
    const headerLabels = nest.map(d => d.key);

    // Define scales with a range of categorical colours.
    const light = d3.scaleOrdinal(d3.schemePastel2)
      .domain(headerLabels);
    const dark = d3.scaleOrdinal(d3.schemeDark2)
      .domain(headerLabels);

    // Add category headers and skills.
    const skills = categories.selectAll(".skill")
      .data(d => d.values)
      .enter()
      .append("g")
      .attr("transform", (d, i) => {
        return "translate(0, " + (((dot + (strokeWidth * 2) + textHeight + (spacer * 2)) * i) + (rowHeight * 2)) + ")";
      });
    skills.append("circle")
      .attr("r", halfDot)
      .attr("cx" , halfDot + strokeWidth)
      .attr("fill", "lightgrey")
      .attr("stroke", "lightgrey")
      .attr("fill", d => {
        let fill = light(d.category);
        if (d.project) {
          fill = dark(d.category);
        }
        if (d.teacher) {
          fill = "#555";
        }
        return fill;
      })
      .attr("stroke", d => {
        let stroke = light(d.category);
        if (d.project) {
          stroke = dark(d.category);
        }
        if (d.student) {
          stroke = "#555";
        }
        return stroke;
      })
      .attr("stroke-width", strokeWidth);
    skills.append("text")
      .attr("y", halfDot + textHeight)
      .text(d => d.skill);
  }

  // Render charts.
  all();
  personal();

});

/* elasticdump \
--input=dump.json \
--output=http://localhost:9200 */

// Map elastcsearch response into required format.
/* const client = new elasticsearch.Client();
client.search({
  index: 'commits',
  type: 'commits',
  body: {
    "size": 0,
    "query": {
      "wildcard": {
        "author.email.keyword": "*wunder*"
      }
    },
    "aggs": {
      "skills": {
        "terms": {
          "size": 52074,
          "field": "tags.keyword",
          "order": {
            "_term": "asc"
          }
        },
        "aggs": {
          "people": {
            "terms": {
              "size": 52074,
              "field": "author.name.keyword",
              "order": {
                "_term": "asc"
              }
            }
          }
        }
      }
    }
  }
}).then(function(response) { */

// Load data.
d3.json("response.json").then(function (response) {
  const buckets = response.aggregations.skills.buckets;

  // Generate array of distinct people.
  const distinctPeople = [];
  buckets.forEach(e => {
    e.people.buckets.forEach(e => {
      if (!distinctPeople.includes(e.key)) {
        distinctPeople.push(e.key);
      }
    })
  });

  // Construct table head row.
  const tableHeadRow = [""].concat(distinctPeople);

  // Generate array of table body rows.
  const tableBodyRows = buckets.map(v => {

    // Generate array of skilled people objects.
    const skilledPeople = v.people.buckets.map(v => {
      return {name: v.key, commits: v.doc_count};
    });

    // Construct row.
    tableBodyRow = [];
    const skill = v.key.charAt(0).toUpperCase() + v.key.slice(1).split('_').join(' ');
    tableBodyRow.push(skill);
    distinctPeople.forEach(v => {
      const person = skilledPeople.filter(e => e.name === v);
      const commits = person.length > 0 ? person[0].commits : 0;
      tableBodyRow.push({name: v, commits: commits})
    });
    return tableBodyRow;
  });

  // Generate array of all commit totals.
  const allCommitTotals = [];
  tableBodyRows.forEach(e => {
    e.forEach(e => {
      if (typeof e === 'object') {
        allCommitTotals.push(e.commits);
      }
    })
  });

  // Define colour scheme and scale.
  const scheme = d3.scaleSequential(d3.interpolateOrRd);
  const scale = d3.scaleLinear()
    .domain([d3.min(allCommitTotals), d3.max(allCommitTotals)])
    .range([.05, 1]);

  // Generate table.
  const table = d3.select(".robot")
    .append("table");
  table.append("thead")
    .append("tr")
    .selectAll("th")
    .data(tableHeadRow)
    .enter()
    .append("th")
    .append("div")
    .text(d => d);
  const tr = table.append("tbody")
    .selectAll("tr")
    .data(tableBodyRows)
    .enter()
    .append("tr");
  const td = tr.selectAll("td")
    .data(d => d)
    .enter()
    .append((d, i) => {
      return i ? document.createElement('td') : document.createElement('th');
    })
    .style("background-color", (d, i) => {
      return (i && d.commits) ? scheme(scale(d.commits)) : "transparent";
    })
    .style("color", d => {
      return d.commits > (d3.max(allCommitTotals) * .5) ? "white" : "black";
    })
    .append("div")
    .text((d, i) => {
      return i ? d.commits : d;
    });
});

/* } , function(error) {
  console.trace(error.message);
}); */
