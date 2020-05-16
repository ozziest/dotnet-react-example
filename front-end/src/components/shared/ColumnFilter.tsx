import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSortAlphaUp, faSortAlphaDown } from '@fortawesome/free-solid-svg-icons'
import ColumnOrder from './ColumnOrder';

interface IState {
  searchValue: any,
  isActive: boolean;
}

interface IProps {
  column: string,
  title: string,
  filter: any,
  setFilter: any | null,
  sorting: any,
  clear: any,
  data: any
}

export default class ColumnFilter extends React.Component<IProps, IState> {
  state: IState;
  wrapperRef: any;
  search: any;

  constructor(props: IProps) {
    super(props);
    // We should handle click outside
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
    // Initilization of the state
    this.state = { isActive: false, searchValue: '' };
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
    let box;
    let filterComponent = <div className="form-group">
      <label>{this.props.title}</label>
      <input type="text"
        className="form-control form-control-sm"
        placeholder="Ara"
        value={this.props.data.filters[this.props.column]}
        onChange={(event) => this.props.setFilter(event.target.value)} />
    </div>

    if (this.props.filter) {
      filterComponent = this.props.filter
    }

    if (this.state.isActive) {
      box = <ul className="filter-box" ref={this.setWrapperRef}>
        <div className="header">
          Filtrele
        </div>
        <div className="body">
          <form>
            <ColumnOrder
              orderBy={this.props.data.orderBy}
              orderType={this.props.data.orderType}
              column={this.props.column}
              sortDirectly={this.props.sorting} />
            {filterComponent}
          </form>
        </div>
        <div className="footer text-center">
          <button className="btn btn-danger btn-sm btn-block" onClick={this.props.clear}>Temizle</button>
        </div>
      </ul>
    }

    let sortIcon;

    if (this.props.data.orderBy === this.props.column) {
      if (this.props.data.orderType === 'ASC') {
        sortIcon = <FontAwesomeIcon icon={faSortAlphaUp} />
      } else {
        sortIcon = <FontAwesomeIcon icon={faSortAlphaDown} />
      }
    }

    return (
      <th>
        <div className="column-name" onClick={() => this.props.sorting(this.props.column, 'ASC')}>
          {this.props.title}
          <span className="sort-icon float-right">{sortIcon}</span>
        </div>
        <li>
          <div className="filter-link" onClick={this.toggleActive}>
            <FontAwesomeIcon icon={faFilter} />
          </div>
          {box}
        </li>
      </th>
    );
  }
}
