import React from 'react';

interface IProps {
  data: any,
  setFilter: any
}

interface IState {
  value: any,
  branches: any[]
}

export default class BranchFilter extends React.Component<IProps, IState> {
  state: IState;

  constructor (props: IProps) {
    super(props);
    this.state = {
      value: this.props.data.filters.branch,
      branches: [
        { label: 'Tümü', value: -1 },
        { label: "9-A", value: 1 },
        { label: "10-A", value: 2 },
        { label: "11-A", value: 3 }
      ]
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event: any) {
    this.setState({
      value: event.target.value
    })
    this.props.setFilter(event.target.value)
  }

  render () {
    return (
      <div className="form-group">
        <label>Şube</label>
        <select className="form-control" value={this.state.value} onChange={this.handleChange}>
          {this.state.branches.map((branch) => 
            <option key={branch.value} value={branch.value}>{branch.label}</option>
          )}
        </select>
      </div>
    );
  }
}
