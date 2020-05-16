import React from 'react';

export default class BranchFilter extends React.Component {
  render () {
    return (
      <div className="form-group">
        <label>Şube</label>
        <select className="form-control">
          <option>9-A</option>
          <option>10-A</option>
          <option>11-A</option>
        </select>
      </div>
    );
  }
}
