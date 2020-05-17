import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAlphaUp, faSortAlphaDown } from '@fortawesome/free-solid-svg-icons'

interface IProps {
  orderBy: string,
  orderType: string,
  column: string
}

export default class SortIcon extends React.Component<IProps> {
  render () {
    let sortIcon;

    if (this.props.orderBy === this.props.column) {
      if (this.props.orderType === 'ASC') {
        sortIcon = <FontAwesomeIcon icon={faSortAlphaUp} />
      } else {
        sortIcon = <FontAwesomeIcon icon={faSortAlphaDown} />
      }
    }

    return (
      <span className="sort-icon float-right">{sortIcon}</span>
    );
  }
}
