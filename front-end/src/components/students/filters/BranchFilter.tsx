import React from 'react';
import TextColumnFilter from './../../shared/TextColumnFilter'
import BaseColumnFilter from './../../shared/BaseColumnFilter'
import ISelectItem from './../../shared/interfaces/ISelectItem'

interface IState {
  branches: ISelectItem[]
}

export default class BranchFilter extends TextColumnFilter {
  localState: IState;

  constructor (props: any) {
    super(props)
    this.localState = {
      branches: [
        { title: 'Tümü', id: -1 },
        { title: "9-A", id: 1 },
        { title: "10-A", id: 2 },
        { title: "11-A", id: 3 }
      ]
    }
  }

  render () {
    let filterComponent = <div className="form-group">
      <label>Şube</label>
      <select className="form-control"
        value={this.props.data[this.props.column]}
        onChange={(event) => this.props.setFilter(this.props.column, event.target.value)}>
        {this.localState.branches.map((branch) => 
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
