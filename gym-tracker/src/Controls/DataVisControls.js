import React, { Component } from "react";

class DataVisControls extends Component {
  render() {
    return(
      <div className="data-vis-controls clearfix">
        <button
          className="btn"
          onClick={this._handle10WeeksClick.bind(this)}
        >
          10 weeks
        </button>
        <button
          className="btn"
          onClick={this._handle52WeeksClick.bind(this)}
        >
          52 weeks
        </button>
      </div>
    );
  }

  _handle10WeeksClick() {
    this.props.on10WeeksClick();
  }

  _handle52WeeksClick() {
    this.props.on52WeeksClick();
  }
}

export default DataVisControls;
