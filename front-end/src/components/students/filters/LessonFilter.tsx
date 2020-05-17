import React from 'react';
import axios from 'axios';
import BaseColumnFilter from './../../shared/BaseColumnFilter'
import ISelectItem from './../../shared/interfaces/ISelectItem'

interface IState {
  isActive: boolean,
  lessons: ISelectItem[]
}

interface IProps {
  column: string,
  title: string,
  setFilter(column: string, value: string, isSearch: boolean): void,
  sorting: any,
  clear: any,
  data: any
}

export default class ColumnFilter extends React.Component<IProps, IState> {
  state: IState;
  wrapperRef: any;

  constructor (props: any) {
    super(props)
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
    this.state = {
      isActive: false,
      lessons: []
    }
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside);
    axios.get('https://localhost:5001/api/lessons').then(response => {
      response.data.forEach((item:any) => {
        item.title = `${item.title} (${item.level}. Sınıf)`
      })
      response.data.unshift({
        id: -1,
        title: 'Tümü'
      })

      this.setState({
        lessons: response.data.map((item: any) => {
          return {
            id: item.id,
            title: item.title
          }
        })
      })
    })
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
    let filterComponent = <div className="form-group">
      <label>Şube</label>
      <select className="form-control"
        value={this.props.data[this.props.column]}
        onChange={(event) => this.props.setFilter(this.props.column, event.target.value, false)}>
        {this.state.lessons.map((branch) => 
          <option key={branch.id} value={branch.id}>{branch.title}</option>
        )}
      </select>
    </div>

    return (
      <BaseColumnFilter
        isActive={this.state.isActive}
        column={this.props.column}
        title={this.props.title}
        setFilter={this.props.setFilter}
        sorting={this.props.sorting}
        clear={this.props.clear}
        data={this.props.data}
        filterComponent={filterComponent}
        toggleActive={this.toggleActive}
        setWrapperRef={this.setWrapperRef}
        />
    );
  }
}
