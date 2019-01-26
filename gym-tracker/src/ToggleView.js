import React, { Component } from "react";
import DataVis from "./DataVis/DataVis.js";
import AddForm from "./Forms/AddForm.js";
import RemoveForm from "./Forms/RemoveForm.js";

class ToggleView extends Component {
  render() {
    if (this.props.weeks10) {
      return(
        <DataVis
          weeks={10}
        />
      );
    }
    if (this.props.weeks52) {
      return (
        <DataVis
          weeks={52}
        />
      );
    }
    if (this.props.add) {
      return (
        <AddForm />
      );
    }
    if (this.props.remove) {
      return(
        <RemoveForm />
      );
    }
  }
}

export default ToggleView;
