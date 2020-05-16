import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

interface IState {
  isActive: boolean;
}

export default class ColumnFilter extends React.Component<Readonly<{}>, IState> {
  state: IState;
  wrapperRef: any;

  constructor(props: Readonly<{}>) {
    super(props);
    // We should handle click outside
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = { isActive: false };
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
                <button type="button" className="btn btn-sm btn-light">A → Z</button>
                <button type="button" className="btn btn-sm btn-light">Z → A</button>
              </div>
            </div>
            <div className="form-group">
              <label>No</label>
              <input type="text" className="form-control form-control-sm" placeholder="Ara" />
            </div>
          </form>
        </div>
        <div className="footer text-center">
          <button className="btn btn-danger btn-sm btn-block">Temizle</button>
        </div>
      </ul>
    }

    return (
      <li>
        <div className="filter-linkt" onClick={() => this.toggleActive()}>
          <FontAwesomeIcon icon={faFilter} />
        </div>
        {box}
      </li>
    );
  }
}
