import React from 'react';
import Navigation from './shared/Navigation';
import ColumnFilter from './shared/ColumnFilter';
import LessonFilter from './students/filters/LessonFilter';
import BranchFilter from './students/filters/BranchFilter';

interface IFilter {
  no: string | null,
  name: string | null,
  surname: string | null,
  branch: -1,
  lesson: -1
}

interface IState {
  orderBy: string,
  orderType: string,
  page: number,
  recordPerPage: number,
  filters: IFilter
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
      filters: {
        no: null,
        name: null,
        surname: null,
        branch: -1,
        lesson: -1
      }
    };
    this.onSort = this.onSort.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.setFilter = this.setFilter.bind(this)
  }

  onSort (column: string, type: string) {
    this.setState({
      orderBy: column,
      orderType: type
    }, () => {
      this.paginate()
    })
  }

  clearFilter () {
    this.setState({
      orderBy: 'no',
      orderType: 'ASC'
    }, () => {
      this.paginate()
    })
  }

  setFilter (column: string, value: any) {
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [column]: value
       } as any
    }), () => {
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
                setFilter={this.setFilter}
                column="no"
                title="No"
                filter={null} />
              <ColumnFilter
                clear={this.clearFilter}
                data={this.state}
                sorting={this.onSort}
                setFilter={this.setFilter}
                column="name"
                title="Ad"
                filter={null} />
              <ColumnFilter
                clear={this.clearFilter}
                data={this.state}
                sorting={this.onSort}
                setFilter={this.setFilter}
                column="surname"
                title="Soyad"
                filter={null} />
              <ColumnFilter
                clear={this.clearFilter}
                data={this.state}
                sorting={this.onSort}
                setFilter={this.setFilter}
                column="branch"
                title="Şube"
                filter={<BranchFilter data={this.state} setFilter={(value: any) => this.setFilter('branch', value) } />} />
              <ColumnFilter
                clear={this.clearFilter}
                data={this.state}
                sorting={this.onSort}
                setFilter={this.setFilter}
                column="lesson"
                title="Dersler"
                filter={<LessonFilter data={this.state} setFilter={(value: any) => this.setFilter('lesson', value) } />} />
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
