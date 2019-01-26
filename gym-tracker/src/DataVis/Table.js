import React, { Component } from "react";
import "./Table.less";
import d3 from "d3";

class Table extends Component {

  _renderTable() {

    // create selection on dom node reference
    let node = this.refs.anchor;

    let table = d3.select(node);

    table.selectAll("*").remove();

    // append table header
    table.append("thead")
      .append("tr")
      .selectAll("td")
      .data(["", "M", "T", "W", "T", "F", "S", "S"])
      .enter()
      .append("td")
      .text(d => { return d; });

    // append table body
    let tbody = table.append("tbody");

    let tr = tbody.selectAll("tr")
      .data(this.props.data.filter((d, i) => { return i < this.props.weeks; }))
      .enter()
      .append("tr");

    if (this.props.weeks === 10) {
      let td = tr.selectAll("td")
        .data(d => { return d; })
        .enter()
        .append("td")

        // add month to first column only
        .text((d, i) => { if (i === 0) return d; })

        // now filter out first column
        .filter((d, i) => { return i > 0; })
        .append("svg")
        .attr("width", 26)
        .attr("height", 26)

        // append wod indicators
        .append("g");
        td.append("circle")
        .attr("class", d => { return this._getClass(d); })
        .attr("cx", 13)
        .attr("cy", 13)
        .attr("r", 13);
        td.append("text")
        .text(d => { return d.charAt(0); })
        .attr("x", 13)
        .attr("y", 13)
        .attr("dy", ".3em");
    } else {
      let months = [];
      tr.selectAll("td")
      .data(d => { months.push(d[0]); return d; })
      .enter()
      .append("td")
      .attr("class", (d, i) => {
        return (i === 0) ? d.toLowerCase() : this._getClass(d);
      });

      // remove duplicates months
      const classes = months.filter((d, i, s) => { return s.indexOf(d) === i; })

      // create classes
      .map(d => { return "." + d.toLowerCase() });

      // remove classes at even indexes
      let oddClasses = [];
      for (let i = 1; i < classes.length; i++) {
        if ((i + 1) % 2 === 0) oddClasses.push(classes[i]);
      }

      // create row spans
      oddClasses.forEach(function(d, i) {
        let month = d3.selectAll(d);
        month.each(function(d, i) {
          if (i === 0) {
            d3.select(this).attr("rowspan", month.size())
            .text(d);
          } else {
            d3.select(this).remove();
          }
        });
      });
    }
  }

  // return wod class selector
  _getClass(wod) {
    let type;
    switch(wod) {
      case "Barbara":
      case "Chelsea":
      case "Mary":
      case "Cindy":
      case "Annie":
      case "Nicole":
      case "Angie":
        type = "body-weight";
        break;
      case "Eva":
      case "Helen":
      case "Kelly":
      case "Karen":
        type = "no-bars";
        break;
      case "Amanda":
      case "Jackie":
      case "Diane":
      case "Fran":
      case "Elizabeth":
      case "Nancy":
      case "Lynne":
        type = "mixed";
        break;
      case "Isabel":
      case "Linda":
      case "Grace":
        type = "heavy";
        break;
      default:
        type = "rest-day";
    }
    return type;
  }

  // create table on every re-render
  componentDidUpdate() {
    this._renderTable();
  }
  componentDidMount() {
    this._renderTable();
  }

  // render component
  render() {
    return (
      <table className={"weeks-" + this.props.weeks} ref="anchor"></table>
    )
  }
}

export default Table;
