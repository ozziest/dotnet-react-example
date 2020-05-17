import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import ColumnName from './ColumnName'
import FilterBox from './FilterBox'

interface IProps {
  isActive: boolean,
  column: string,
  title: string,
  setFilter(column: string, value: string): void,
  sorting: any,
  clear: any,
  data: any,
  filterComponent: any,
  toggleActive: any,
  setWrapperRef: any
}

export default class BaseColumnFilter extends React.Component<IProps> {
  render () {
    return (
      <th>
        <ColumnName 
          title={this.props.title}
          orderBy={this.props.data.orderBy}
          orderType={this.props.data.orderType}
          column={this.props.column}
          sorting={this.props.sorting}
        />
        <li>
          <div className="filter-link" onClick={this.props.toggleActive}>
            <FontAwesomeIcon icon={faFilter} />
          </div>
          <FilterBox
            refx={this.props.setWrapperRef}
            isActive={this.props.isActive}
            orderBy={this.props.data.orderBy}
            orderType={this.props.data.orderType}
            column={this.props.column}
            sorting={this.props.sorting}
            filterComponent={this.props.filterComponent}
            clear={this.props.clear}/>
        </li>
      </th>
    );
  }
}
