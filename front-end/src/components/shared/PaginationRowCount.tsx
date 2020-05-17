import React from 'react';

interface IProps {
  page: number,
  recordPerPage: number,
  index: number
}

export default class PaginationRowCount extends React.Component<IProps> {
  render () {
    return (
      <b>
        {((this.props.page - 1) * this.props.recordPerPage) + this.props.index + 1})
      </b>
    );
  }
}
