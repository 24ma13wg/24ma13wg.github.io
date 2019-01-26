import React, { Component } from "react";
import "./DataVis.less";
import moment from "moment";
import d3 from "d3";
import Table from "./Table.js";

class DataVis extends Component {

  constructor() {
    super();
    this.state = { data: [] };
  }

  componentWillMount() {
    this._loadData();
  }

  _loadData() {
    d3.csv("./data.csv").get((error, data) => {
      if (error) {
        console.error(error);
        console.error(error.stack);
      } else {

        // create empty structure
        let rows = [];
        for (let i = 0; i < 52; i++) {
          rows.push({
            "month": moment().subtract(i, "weeks").format("MMM"),
            "mon": "",
            "tue": "",
            "wed": "",
            "thu": "",
            "fri": "",
            "sat": "",
            "sun": "",
            "start": moment()
              .subtract(i, "weeks")
              .startOf("isoWeek")
              .format("x"),
            "end": moment().subtract(i, "weeks").endOf("isoWeek").format("x")
          });
        }

        // insert wods
        data.forEach(d => {
          const wodDate = moment(d.date).format("x");
          const wodName = d.wod;
          const wodDay = moment(d.date).format("ddd").toLowerCase();
          rows.forEach(d => {
            if (wodDate >= d.start && wodDate <= d.end) {
              d[wodDay] = wodName;
            }
          });
        });
        rows = rows.map(d => {

          // covert objects into arrays
          let a = Object.keys(d).map(k => d[k]);

          // remove start and end dates
          a.splice(-2, 2);
          return a;
        });
        this.setState({ data: rows });
      }
    });
  };

  render() {
    if (!this.state.data.length) {
      return (
        <div className="loading">Loading...</div>
      );
    }
    return(
      <Table
        data={this.state.data}
        weeks={this.props.weeks}
      />
    );
  }

}

export default DataVis;
