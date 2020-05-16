import React from 'react';

export default class LessonFilter extends React.Component {
  render () {
    return (
      <div className="form-group">
        <label>Ders</label>
        <select className="form-control">
          <option>Fen</option>
          <option>Türkçe</option>
          <option>Matematik</option>
        </select>
      </div>
    );
  }
}
