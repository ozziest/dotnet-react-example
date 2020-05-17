import React from 'react';
import axios from 'axios';
import TextColumnFilter from './../../shared/TextColumnFilter'
import BaseColumnFilter from './../../shared/BaseColumnFilter'
import ISelectItem from './../../shared/interfaces/ISelectItem'
import IColumnFilterState from './../../shared/interfaces/IColumnFilterState'

interface IState extends IColumnFilterState {
  branches: ISelectItem[]
}

export default class BranchFilter extends TextColumnFilter {
  state: IState;

  constructor (props: any) {
    super(props)
    this.state = {
      isActive: false,
      branches: []
    }
  }

  componentDidMount () {
    console.log('componentDidMount')
    axios.get('https://localhost:5001/api/branches').then(response => {
      response.data.unshift({
        id: -1,
        title: 'Tümü'
      })

      this.setState({
        branches: response.data.map((item: ISelectItem) => {
          return {
            id: item.id,
            title: item.title
          }
        })
      } as any)
    })
  }

  render () {
    let filterComponent = <div className="form-group">
      <label>Şube</label>
      <select className="form-control"
        value={this.props.data[this.props.column]}
        onChange={(event) => this.props.setFilter(this.props.column, event.target.value, false)}>
        {this.state.branches.map((branch) => 
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
