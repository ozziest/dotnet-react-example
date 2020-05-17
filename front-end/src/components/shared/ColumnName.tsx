import React from 'react';
import SortIcon from './SortIcon'

interface IProps {
  title: string,
  orderBy: string,
  orderType: string,
  column: string,
  sorting (column: string, type: string): void
}

export default class ColumnName extends React.Component<IProps> {
  render () {
    return (
      <div className="column-name" onClick={() => this.props.sorting(this.props.column, 'ASC')}>
        {this.props.title}
        <SortIcon
          orderBy={this.props.orderBy}
          orderType={this.props.orderType}
          column={this.props.column}
            />
      </div>
    );
  }
}
