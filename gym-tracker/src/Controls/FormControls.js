import React, { Component } from "react";
import "./FormControls.less";

class FormControls extends Component {
  render() {
    return(
      <div className="form-controls clearfix">
        {(this.props.weeks10 || this.props.weeks52) &&
          <div>
            <button
              className="add btn"
              onClick={this._handleAddClick.bind(this)}
            >
              Add
            </button>
            <button
              className="remove btn"
              onClick={this._handleRemoveClick.bind(this)}
            >
              Remove
            </button>
          </div>
        }
        {this.props.add &&
          <div>
            <button
              className="save btn"
            >
              Save
            </button>
            <button
              className="cancel btn"
              onClick={this._handleCancelClick.bind(this)}
            >
              Cancel
            </button>
          </div>
        }
        {this.props.remove &&
          <div>
            <button
              className="delete btn"
            >
              Remove
            </button>
            <button
              className="cancel btn"
              onClick={this._handleCancelClick.bind(this)}
            >
              Cancel
            </button>
          </div>
        }
      </div>
    );
  }

  _handleAddClick() {
    this.props.onAddClick();
  }

  _handleRemoveClick() {
    this.props.onRemoveClick();
  }

  _handleCancelClick() {
    this.props.onCancelClick();
  }
}

export default FormControls;
