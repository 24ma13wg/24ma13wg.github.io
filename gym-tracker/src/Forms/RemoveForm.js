import React, { Component } from 'react';
import './Forms.less';
import moment from "moment";

class RemoveForm extends Component {
  render() {
    return (
      <div className="form">
        <form>
          <div className="form-group">
            <label>Workouts completed</label>
            <select className="form-control">
              <option>{moment().subtract(0, "days").format("DD MMM YYYY")} - Barbara</option>
              <option>{moment().subtract(4, "days").format("DD MMM YYYY")} - Chelsea</option>
              <option>{moment().subtract(8, "days").format("DD MMM YYYY")} - Mary</option>
              <option>{moment().subtract(12, "days").format("DD MMM YYYY")} - Cindy</option>
              <option>{moment().subtract(16, "days").format("DD MMM YYYY")} - Annie</option>
            </select>
          </div>
        </form>
      </div>
    )
  }
}

export default RemoveForm;
