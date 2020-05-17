import React from 'react';
import ColumnOrder from './ColumnOrder';

interface IProps {
  isActive: boolean,
  orderBy: string,
  orderType: string,
  column: string,
  sorting (column: string, type: string): void,
  filterComponent: any,
  refx: any,
  clear (): void
}

export default class FilterBox extends React.Component<IProps> {
  render () {
    if (!this.props.isActive) {
      return null
    }
    return (
      <ul className="filter-box" ref={this.props.refx}>
        <div className="header">
          Filtrele
        </div>
        <div className="body">
          <form>
            <ColumnOrder
              orderBy={this.props.orderBy}
              orderType={this.props.orderType}
              column={this.props.column}
              sortDirectly={this.props.sorting} />
            {this.props.filterComponent}
          </form>
        </div>
        <div className="footer text-center">
          <button className="btn btn-danger btn-sm btn-block" onClick={this.props.clear}>Temizle</button>
        </div>
      </ul>
    );
  }
}
