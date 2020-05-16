import React from 'react';
import Navigation from './shared/Navigation';
import ColumnFilter from './shared/ColumnFilter';
import LessonFilter from './students/filters/LessonFilter';
import BranchFilter from './students/filters/BranchFilter';

interface IState {
  orderBy: string,
  orderType: string,
  page: number,
  recordPerPage: number,
  no: string | null,
  name: string | null,
  surname: string | null,
  branch: number,
  lesson: number
}

export default class Students extends React.Component<Readonly<{}>, IState> {
  state: IState;

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      orderBy: 'no',
      orderType: 'ASC',
      page: 1,
      recordPerPage: 10,
      no: '',
      name: '',
      surname: '',
      branch: -1,
      lesson: -1
    };
    this.onSort = this.onSort.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.setNoFilter = this.setNoFilter.bind(this)
    this.setNameFilter = this.setNameFilter.bind(this)
    this.setSurnameFilter = this.setSurnameFilter.bind(this)
    this.setBranchFilter = this.setBranchFilter.bind(this)
    this.setLessonFilter = this.setLessonFilter.bind(this)
  }

  sortDirectly (column: string, type: string) {
    this.setState({
      orderBy: column,
      orderType: type
    }, this.paginate)
  }

  onSort (column: string, type: string, force: boolean | null) {
    if (force) {
      return this.sortDirectly(column, type)
    }

    if (this.state.orderBy !== column) {
      return this.sortDirectly(column, 'ASC')
    }

    if (this.state.orderType === 'ASC') {
      return this.sortDirectly(this.state.orderBy, 'DESC')
    }

    this.sortDirectly(this.state.orderBy, 'ASC')
  }

  clearFilter () {
    this.setState({
      orderBy: 'no',
      orderType: 'ASC',
      page: 1,
      recordPerPage: 10,
      no: '',
      name: '',
      surname: '',
      branch: -1,
      lesson: -1
    }, () => {
      this.paginate()
    })
  }

  setNoFilter (value: string) {
    this.setState({
      no: value
    }, () => {
      this.paginate()
    })
  }

  setNameFilter (value: string) {
    this.setState({
      name: value
    }, () => {
      this.paginate()
    })
  }

  setSurnameFilter (value: string) {
    this.setState({
      surname: value
    }, () => {
      this.paginate()
    })
  }

  setBranchFilter (value: number) {
    this.setState({
      branch: value
    }, () => {
      this.paginate()
    })
  }

  setLessonFilter (value: number) {
    this.setState({
      lesson: value
    }, () => {
      this.paginate()
    })
  }

  paginate () {
    console.log('paginate', JSON.stringify(this.state))
  }

  render () {
    return (
      <div>
        <h2>
          Öğrenciler
          <button className="btn btn-success float-right">
            Ekle
          </button>
        </h2>
  
        <hr />

        <table className="table table-border">
          <thead>
            <tr>
              <th className="row-count">#</th>
              <ColumnFilter
                clear={this.clearFilter}
                data={this.state}
                sorting={this.onSort}
                setFilter={this.setNoFilter}
                column="no"
                title="No"
                filter={null} />
              <ColumnFilter
                clear={this.clearFilter}
                data={this.state}
                sorting={this.onSort}
                setFilter={this.setNameFilter}
                column="name"
                title="Ad"
                filter={null} />
              <ColumnFilter
                clear={this.clearFilter}
                data={this.state}
                sorting={this.onSort}
                setFilter={this.setSurnameFilter}
                column="surname"
                title="Soyad"
                filter={null} />
              <ColumnFilter
                clear={this.clearFilter}
                data={this.state}
                sorting={this.onSort}
                setFilter={this.setBranchFilter}
                column="branch"
                title="Şube"
                filter={<BranchFilter data={this.state} setFilter={this.setBranchFilter} />} />
              <ColumnFilter
                clear={this.clearFilter}
                data={this.state}
                sorting={this.onSort}
                setFilter={this.setLessonFilter}
                column="lesson"
                title="Dersler"
                filter={<LessonFilter data={this.state} setFilter={this.setLessonFilter} />} />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>23</td>
              <td>Özgür</td>
              <td>Işıklı</td>
              <td>12-BT</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
  
        <div>
          245 kayıt arasından 1-10 arasındakiler gösteriliyor.
          <Navigation></Navigation>
        </div>
      </div>
    );
  }
}
