// @todo Add filtering with a subtle transition.

// Globals.
const width = 960;
const height = 960;
const dot = 16;
const halfDot = dot / 2;
let count = 0;
const rowHeight = dot * 2;
const columnWidth = 150;
const spacer = 5;
const canvas = width - columnWidth * 2;
const maxDots = Math.floor(canvas / (dot + spacer));
let categoryRowsOffset = 0;
let skillRowsOffset = 0;

// Add SVG container.
const svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Add legend
const legend = svg.append("g")
  .attr("class", "legend");
legend.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 478)
  .attr("height", 69)
  .attr("class", "legend-container");

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

// Add project capable key.
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
  count = 0;
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
      x = (i - (maxDots * rowNumber)) * (dot + spacer) + columnWidth;
      return x;
    })
    .attr("cy", (d, i) => {
      const rowNumber = Math.ceil((i + 1) / maxDots) - 1;
      y = rowNumber * (spacer + dot) - halfDot;
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

  function translate(d, column) {
    const increment = Math.ceil(d.values.length / maxDots) - 1;
    let offset;
    if (column == "category") {
      offset = categoryRowsOffset * dot + spacer;
    }
    else {
      offset = skillRowsOffset * dot + spacer;
    }
    let push = offset + ++count * rowHeight;
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

});
