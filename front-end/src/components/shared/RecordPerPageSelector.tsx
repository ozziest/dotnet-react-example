import React from 'react';

interface IProps {
  recordPerPage: number,
  setRecordPerPage (recordPerPage: number): void
}

interface IState {
  items: number[]
}

export default class RecordPerPageSelector extends React.Component<IProps> {
  state: IState;

  constructor (props: IProps) {
    super(props)
    this.state = {
      items: [5, 10, 25, 50, 100]
    }
  }
  render () {
    return (
      <select className="form-control record-per-page"
        value={this.props.recordPerPage}
        onChange={(event) => this.props.setRecordPerPage(parseInt(event.target.value))}>
        {this.state.items.map(value =>
          <option key={value} value={value}>{value}</option>
        )}
      </select>
    );
  }
}
