import React from 'react';

interface IProps {
  column: string,
  errors: { [column: string] : string[] }
}

export default class ValidationError extends React.Component<IProps> {
  render () {
    if (!this.props.errors[this.props.column]) {
      return null
    }

    return (
      <small className="form-text text-danger">
        {this.props.errors[this.props.column].map(message => 
          <div key={message}>{message}</div>
        )}
      </small>
    );
  }
}
