import React from 'react';
import axios from 'axios';
import Navigation from './shared/Navigation';
import RecordPerPageSelector from './shared/RecordPerPageSelector'
import TextColumnFilter from './shared/TextColumnFilter';
import PaginationRowCount from './shared/PaginationRowCount';
import LessonFilter from './students/filters/LessonFilter';
import BranchFilter from './students/filters/BranchFilter';
import StudentModal from './students/StudentModal'
import IPagination from './shared/interfaces/IPagination'
import StudentModel from './students/StudentModel'
import debounce from 'lodash/debounce'

interface IState {
  orderBy: string,
  orderType: string,
  page: number,
  recordPerPage: number,
  no: string | null,
  name: string | null,
  surname: string | null,
  branch: number,
  lesson: number,
  isStudentModalOpen: boolean,
  currentStudent: StudentModel|null,
  pagination: IPagination<StudentModel>
}


export default class Students extends React.Component<Readonly<{}>, IState> {
  state: IState;
  searchQuery: any;

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
      lesson: -1,
      isStudentModalOpen: false,
      currentStudent: null,
      pagination: {
        page: 1,
        pages: 0,
        recordPerPage: 5,
        total: 0,
        data: []
      }
    };
    this.onSort = this.onSort.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.openStudentModal = this.openStudentModal.bind(this);
    this.closeStudentModal = this.closeStudentModal.bind(this);
    this.paginate = this.paginate.bind(this);
    this.editStudent = this.editStudent.bind(this);
    this.setRecordPerPage = this.setRecordPerPage.bind(this);
    this.searchQuery = debounce(() => {
      this.paginate(null)
    }, 300)
  }

  componentDidMount () {
    this.paginate(null)
  }

  sortDirectly (column: string, type: string) {
    this.setState({
      orderBy: column,
      orderType: type
    }, () => {
      this.paginate(null)
    })
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
      this.paginate(null)
    })
  }

  setFilter (column: string, value: string, isSearch: boolean) {
    this.setState({
      [column]: value
    } as any, () => {
      if (isSearch === false) {
        this.paginate(null)
      } else {
        this.searchQuery()
      }
    })
  }

  setRecordPerPage (recordPerPage: number) {
    this.setState({
      recordPerPage: recordPerPage
    }, () => {
      this.paginate(null)
    })
  }

  paginate (page: number|null) {
    axios({
      method: 'GET',
      url: 'https://localhost:5001/api/students',
      params: {
        orderBy: this.state.orderBy,
        orderType: this.state.orderType,
        page: page ? page : this.state.pagination.page,
        recordPerPage: this.state.recordPerPage,
        no: this.state.no,
        name: this.state.name,
        surname: this.state.surname,
        branch: this.state.branch,
        lesson: this.state.lesson
      }
    }).then((response) => {
      this.setState({
        pagination: response.data
      })
    })
  }

  openStudentModal () {
    this.setState({
      isStudentModalOpen: true
    })
  }

  closeStudentModal () {
    this.setState({
      isStudentModalOpen: false,
      currentStudent: null
    })
  }

  editStudent (student: StudentModel) {
    this.setState({
      isStudentModalOpen: true,
      currentStudent: student
    })
  }

  render () {
    let studentModal;

    if (this.state.isStudentModalOpen) {
      studentModal = <StudentModal
        refresh={this.paginate}
        student={this.state.currentStudent}
        close={this.closeStudentModal} />
    }

    let notFoundMessage;
    if (this.state.pagination.total === 0) {
      notFoundMessage = <tr>
        <td colSpan={10}>
          <div className="alert alert-warning">
            Henüz bir öğrenci kaydı yapılmadı.
          </div>
        </td>
      </tr>
    }

    return (
      <div>
        <h2>
          Öğrenciler
          <button className="btn btn-success float-right" onClick={this.openStudentModal}>
            Ekle
          </button>
        </h2>

        {studentModal}
  
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
            {notFoundMessage}
            {this.state.pagination.data.map((item, index) =>
              <tr key={item.id}>
                <td>
                  <PaginationRowCount
                    page={this.state.pagination.page}
                    recordPerPage={this.state.pagination.recordPerPage}
                    index={index} />
                </td>
                <td>
                  <button className="btn btn-light btn-sm" onClick={() => this.editStudent(item)}>
                    {item.studentNo}
                  </button>
                </td>
                <td>{item.name}</td>
                <td>{item.surname}</td>
                <td>{item.branchTitle}</td>
                <td>
                  <button className="btn btn-light btn-sm" onClick={() => this.editStudent(item)}>
                    {item.totalLesson} Adet
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
  
        <div>
          <RecordPerPageSelector
            recordPerPage={this.state.recordPerPage}
            setRecordPerPage={this.setRecordPerPage}/>
          <span className="float-left pagination-total">Toplam {this.state.pagination.total} adet kayıt bulundu.</span>
          <Navigation
            pages={this.state.pagination.pages}
            page={this.state.pagination.page}
            paginate={this.paginate} />
        </div>
      </div>
    );
  }
}
