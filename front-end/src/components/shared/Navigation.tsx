import React from 'react';
import times from 'lodash/times'

interface IProps {
  pages: number,
  page: number,
  paginate (page: number|null): void
}

export default class Navigation extends React.Component<IProps> {
  render () {
    return (
      <nav className="float-right">
        <ul className="pagination">
          {times(this.props.pages, (index) =>
            <li className={'page-item ' + (this.props.page === (index + 1) ? 'active': '')} key={index}>
              <button className="page-link" onClick={() => this.props.paginate(index + 1)}>{index + 1}</button>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}
