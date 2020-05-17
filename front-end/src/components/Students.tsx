import React from 'react';
import Navigation from './shared/Navigation';
import TextColumnFilter from './shared/TextColumnFilter';
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
    this.setFilter = this.setFilter.bind(this)
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

  setFilter (column: string, value: string) {
    this.setState({
      [column]: value
    } as any, () => {
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
              <TextColumnFilter
                clear={this.clearFilter}
                data={this.state}
                sorting={this.onSort}
                setFilter={this.setFilter}
                column="no"
                title="No" />
              <TextColumnFilter
                clear={this.clearFilter}
                data={this.state}
                sorting={this.onSort}
                setFilter={this.setFilter}
                column="name"
                title="Ad" />
              <TextColumnFilter
                clear={this.clearFilter}
                data={this.state}
                sorting={this.onSort}
                setFilter={this.setFilter}
                column="surname"
                title="Soyad" />
              <BranchFilter
                clear={this.clearFilter}
                data={this.state}
                sorting={this.onSort}
                setFilter={this.setFilter}
                column="branch"
                title="Şube" />
              <LessonFilter
                clear={this.clearFilter}
                data={this.state}
                sorting={this.onSort}
                setFilter={this.setFilter}
                column="lesson"
                title="Ders" />
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
