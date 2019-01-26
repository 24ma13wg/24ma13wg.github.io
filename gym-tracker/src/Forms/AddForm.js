import React, { Component } from 'react';
import './Forms.less';

class AddForm extends Component {
  render() {
    return (
      <div className="form">
        <form>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input id="date" className="form-control" type="date" />
          </div>
          <div className="form-group">
            <label>Workout</label>
            <select className="form-control">
              <option>Amanda</option>
              <option>Angie</option>
              <option>Annie</option>
              <option>Barbara</option>
              <option>Chelsea</option>
              <option>Cindy</option>
              <option>Diane</option>
              <option>Elizabeth</option>
              <option>Eva</option>
              <option>Fran</option>
              <option>Grace</option>
              <option>Helen</option>
              <option>Isabel</option>
              <option>Jackie</option>
              <option>Karen</option>
              <option>Kelly</option>
              <option>Linda</option>
              <option>Lynne</option>
              <option>Mary</option>
              <option>Nancy</option>
              <option>Nicole</option>
            </select>
          </div>
        </form>
      </div>
    )
  }
}

export default AddForm;
