import React from 'react';
import BaseColumnFilter from './BaseColumnFilter'

interface IState {
  isActive: boolean;
}

interface IProps {
  column: string,
  title: string,
  setFilter(column: string, value: string, isSearch: boolean): void,
  sorting: any,
  clear: any,
  data: any
}

export default class ColumnFilter extends React.Component<IProps, IState> {
  state: IState;
  wrapperRef: any;
  search: any;
  sendQuery: any;

  constructor(props: IProps) {
    super(props);
    // We should handle click outside
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
    // Initilization of the state
    this.state = { isActive: false };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  
  setWrapperRef (node: any) {
    this.wrapperRef = node;
  }

  handleClickOutside(event: { target: any; }) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isActive: false })
    }
  }

  toggleActive () {
    this.setState({ isActive : !this.state.isActive })
  }

  render () {
    let filterComponent = <div className="form-group">
      <label>{this.props.title}</label>
      <input type="text"
        className="form-control form-control-sm"
        placeholder="Ara"
        value={this.props.data[this.props.column]}
        onChange={(event) => this.props.setFilter(this.props.column, event.target.value, true)} />
    </div>

    return (
      <BaseColumnFilter
        isActive={this.state.isActive}
        column={this.props.column}
        title={this.props.title}
        setFilter={this.props.setFilter}
        sorting={this.props.sorting}
        clear={this.props.clear}
        data={this.props.data}
        filterComponent={filterComponent}
        toggleActive={this.toggleActive}
        setWrapperRef={this.setWrapperRef}
        />
    );
  }
}
