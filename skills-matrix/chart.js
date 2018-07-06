// Globals.
const width = 960;
const dot = 16;
const spacer = 5;
const dotPlusSpacer = dot + spacer;
const halfDot = dot / 2;
const columnWidth = 150;
const rowHeight = 30;
const canvasWidth = width - columnWidth * 2;
const maxDots = Math.floor(canvasWidth / dotPlusSpacer);
const legendHeight = 69;
const footer = 40;
let skillCount = 0;
let categoryRowsOffset = 0;
let skillRowsOffset = 0;

// Add SVG container.
const svg = d3.select("body")
  .append("svg")
  .attr("width", width);

// Add legend
const legend = svg.append("g")
  .attr("class", "legend");
legend.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 478)
  .attr("height", legendHeight)
  .attr("class", "legend-bg");

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

// Load data.
d3.json("data.json").then(function(data) {

  // Nest data by category and by skill, and order everything alphabetcally.
  const nest = d3.nest()
    .key(function(d){
      return d.category;
    })
    .sortKeys(d3.ascending)
    .key(function(d){
      return d.skill;
    })
    .sortKeys(d3.ascending)
    .key(function(d){
      return d.name;
    })
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
      const rowNumber = Math.ceil((i + 1) / maxDots) - 1;
      x = (i - (maxDots * rowNumber)) * dotPlusSpacer + columnWidth;
      return x;
    })
    .attr("cy", (d, i) => {
      const rowNumber = Math.ceil((i + 1) / maxDots) - 1;
      y = rowNumber * dotPlusSpacer - halfDot;
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
    });
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
    if (column == "category") {
      offset = categoryRowsOffset * dotPlusSpacer;
    }
    else {
      offset = skillRowsOffset * dotPlusSpacer;
    }
    let push = offset + ++skillCount * rowHeight;
    const width = column == "category" ? 0 : columnWidth;
    const translate = "translate(" + width + ", " + push + ")";
    if (column == "category") {
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
        if (this.value == "project") {
          return d.values[0].project ? halfDot : 0;
        }
        else if (this.value == "student") {
          return d.values[0].student ? halfDot : 0;
        }
        else if (this.value == "teacher") {
          return d.values[0].teacher ? halfDot : 0;
        }
        else {
          return halfDot;
        }
      });
  }

});
