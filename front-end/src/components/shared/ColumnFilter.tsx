import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSortAlphaUp, faSortAlphaDown } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames';
import debounce from 'lodash/debounce'

interface IState {
  searchValue: any,
  isActive: boolean;
}

interface IProps {
  column: string,
  title: string,
  filter: any,
  setFilter: any,
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
    this.sorting = this.sorting.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
    this.sortDirectly = this.sortDirectly.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    // Initilization of the state
    this.state = { isActive: false, searchValue: '' };
    this.search = debounce((value: any) => {
      this.props.setFilter(this.props.column, value)
    }, 300)
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

  sortDirectly (type: string) {
    this.props.sorting(this.props.column, type)
  }

  sorting () {
    if (this.props.data.orderBy !== this.props.column) {
      return this.props.sorting(this.props.column, 'ASC')
    }

    if (this.props.data.orderType === 'ASC') {
      return this.props.sorting(this.props.data.orderBy, 'DESC')
    }

    this.props.sorting(this.props.data.orderBy, 'ASC')
  }

  handleSearchChange (event: any) {
    this.setState({
      searchValue: event.target.value
    });
    this.search(event.target.value)
  }

  render () {
    let box;
    let filterComponent = <div className="form-group">
      <label>{this.props.title}</label>
      <input type="text"
        className="form-control form-control-sm"
        placeholder="Ara"
        value={this.state.searchValue}
        onChange={this.handleSearchChange} />
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
            <div className="form-group">
              <label>Sıralama</label>
              <br />
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button"
                  className={classNames({
                    btn: true,
                    'btn-sm': true,
                    'btn-light': true,
                    active: this.props.data.orderBy === this.props.column && this.props.data.orderType === 'ASC'
                  })}
                  onClick={() => this.sortDirectly('ASC')}>
                  A → Z
                </button>
                <button type="button"
                  className={classNames({
                    btn: true,
                    'btn-sm': true,
                    'btn-light': true,
                    active: this.props.data.orderBy === this.props.column && this.props.data.orderType === 'DESC'
                  })}
                  onClick={() => this.sortDirectly('DESC')}>
                  Z → A
                </button>
              </div>
            </div>
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
        <div className="column-name" onClick={this.sorting}>
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
