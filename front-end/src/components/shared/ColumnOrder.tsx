import React from 'react';
import classNames from 'classnames';

interface IProps {
  orderBy: string,
  orderType: string,
  column: string,
  sortDirectly(column: string, type: string, force: boolean | null): void
}

export default class ColumnOrder extends React.Component<IProps> {
  render () {
    return (
      <div className="form-group">
      <label>Sıralama</label>
      <br />
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button"
          className={classNames({
            btn: true,
            'btn-sm': true,
            'btn-light': true,
            active: this.props.orderBy === this.props.column && this.props.orderType === 'ASC'
          })}
          onClick={() => this.props.sortDirectly(this.props.column, 'ASC', true)}>
          A → Z
        </button>
        <button type="button"
          className={classNames({
            btn: true,
            'btn-sm': true,
            'btn-light': true,
            active: this.props.orderBy === this.props.column && this.props.orderType === 'DESC'
          })}
          onClick={() => this.props.sortDirectly(this.props.column, 'DESC', true)}>
          Z → A
        </button>
      </div>
    </div>
    )
  }
}
