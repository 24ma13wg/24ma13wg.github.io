import React, { Component } from "react";
import "./App.less";
//import bootstrap from "bootstrap";
import DataVisControls from "./Controls/DataVisControls";
import ToggleView from "./ToggleView";
import FormControls from "./Controls/FormControls";

class App extends Component {
  constructor() {
    super();
    this.state = {
      weeks10: true,
      weeks52: false,
      add: false,
      remove: false
    };
  }

  render() {
    return(
      <div className="app-wrap">
        <div>
          <nav className="nav-gt">
            <small><a href="/">Home</a></small>
          </nav>
          <h1 className="h1-gt">Gym tracker</h1>
          <small>
            <time dateTime="2015-11-01 00:00" className="time-gt">November, 2015</time>
          </small>
        </div>
        <div className="gym-tracker">
          <h1>CrossFit workouts</h1>
          <DataVisControls
            on10WeeksClick={this._on10WeeksClick.bind(this)}
            on52WeeksClick={this._on52WeeksClick.bind(this)}
          />
          <ToggleView
            weeks10={this.state.weeks10}
            weeks52={this.state.weeks52}
            add={this.state.add}
            remove={this.state.remove}
          />
          <FormControls
            onAddClick={this._onAddClick.bind(this)}
            onRemoveClick={this._onRemoveClick.bind(this)}
            onCancelClick={this._on10WeeksClick.bind(this)}
            weeks10={this.state.weeks10}
            weeks52={this.state.weeks52}
            add={this.state.add}
            remove={this.state.remove}
          />
        </div>
        <div>
          <p className="lead-gt">Here, I am generating tables with <a href="https://d3js.org/" target="_blank">D3</a>, inside of <a href="https://facebook.github.io/react/" target="_blank">React</a> components. This application could help a gym goer to track their workouts by showing, visually, how varied their workouts are (or not). The content, in this example, is based on <a href="https://www.crossfit.com/" target="_blank">CrossFit</a> workouts, but anything could be tracked, such as different lengths of a training run. To preserve the data, I have disabled the add and remove buttons.</p>
          <footer className="footer-gt"></footer>
        </div>
      </div>
    );
  }

  _on10WeeksClick() {
    this.setState({
      weeks10: true,
      weeks52: false,
      add: false,
      remove: false
    });
  }

  _on52WeeksClick() {
    this.setState({
      weeks10: false,
      weeks52: true,
      add: false,
      remove: false
    });
  }

  _onAddClick() {
    this.setState({
      weeks10: false,
      weeks52: false,
      add: true,
      remove: false
    });
  }

  _onRemoveClick() {
    this.setState({
      weeks10: false,
      weeks52: false,
      add: false,
      remove: true
    });
  }
}

export default App;
