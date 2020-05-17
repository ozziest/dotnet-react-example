import React from 'react';
import axios from 'axios'
import ISelectItem from './../shared/interfaces/ISelectItem'
import ISelectableItem from './../shared/interfaces/ISelectableItem'
import StudentModel from './StudentModel'
import ValidationError from './../shared/ValidationError'
import { toast } from 'react-toastify';

interface IState {
  id: number|null,
  name: string,
  surname: string,
  number: string,
  selectedLevelId: number,
  branchId: number,
  branches: ISelectItem[],
  lessons: ISelectableItem[],
  errors: { [column: string] : string[] }
}

interface IProps {
  student: StudentModel|null,
  refresh (page: number|null): void,
  close (): void
}

export default class StudentModal extends React.Component<IProps> {
  state: IState;
  studentLessons: any[];

  constructor (props: IProps) {
    super(props);
    this.state = {
      id: null,
      name: '',
      surname: '',
      number: '',
      selectedLevelId: -1,
      branchId: -1,
      branches: [],
      lessons: [],
      errors: {}
    }
    this.studentLessons = []

    this.onChangeInput = this.onChangeInput.bind(this);
    this.setBranchId = this.setBranchId.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount () {
    Promise.all([
      this.fetchBranches(),
      this.fetchLessons(),
      this.fetchStudentLessons()
    ]).then(() => {
      if (this.props.student) {
        let student : StudentModel;
        student = this.props.student;
        let selectedBranch : ISelectItem | undefined
        selectedBranch = this.state.branches.find(item => item.id === student.branchId)
        let selectedLevelId = null
        if (selectedBranch) {
          selectedLevelId = selectedBranch.level
        }

        // We should mark as selected if the user has any selected lesson
        const selectedLessonIds = this.studentLessons.map(item => item.lessonId)
        this.setState((state: IState) => {
          state.lessons
            .filter(item => selectedLessonIds.indexOf(item.id) > -1)
            .forEach(item => item.isSelected = true)
          return state
        })
    
        this.setState({
          selectedLevelId,
          id: this.props.student.id,
          name: this.props.student.name,
          surname: this.props.student.surname,
          number: this.props.student.studentNo,
          branchId: this.props.student.branchId
        });
      }
    })
  }

  fetchStudentLessons () {
    return new Promise((resolve) => {
      if (!this.props.student) {
        return resolve()
      }
      
      axios.get(`https://localhost:5001/api/students/${this.props.student.id}/lessons`)
        .then((response) => {
          this.studentLessons = response.data
          resolve()
        })
    })
  }

  fetchBranches () {
    return new Promise((resolve) => {
      axios.get('https://localhost:5001/api/branches')
        .then((response) => {
          this.setState({
            selectedLevelId: response.data[0].level,
            branchId: response.data[0].id,
            branches: response.data.map((item: any) => {
              return {
                id: item.id,
                title: item.title,
                level: item.level
              }
            })
          });
          resolve()
        })
    });
  }

  fetchLessons () {
    return new Promise((resolve) => {
      axios
        .get('https://localhost:5001/api/lessons')
        .then((response) => {
          this.setState({
            lessons: response.data.map((lesson: any) => {
              return {
                id: lesson.id,
                level: lesson.level,
                title: `${lesson.title} (${lesson.level}. Sınıf)`,
                isSelected: false
              }
            })
          })
          resolve()
        })
    })
  }

  onChangeInput (name: string, value: string) {
    this.setState({
      [name]: value
    })
  }

  setBranchId (event: any) {
    let selectedBranch : ISelectItem | undefined
    let branchId : number;
    selectedBranch = this.state.branches.find(item => item.id === parseInt(event.target.value)) 
    let selectedLevelId : number|null;
    if (selectedBranch) {
      selectedLevelId = selectedBranch.level
      branchId = selectedBranch.id
    }
    this.setState((state: IState) => {
      // First we should clear old selections if there is any
      state.lessons.forEach(item => item.isSelected = false);
      if (selectedLevelId) {
        state.selectedLevelId = selectedLevelId
        state.branchId = branchId
      }
      return state
    })
  }
  
  save () {
    const data = {
      id: this.state.id,
      name: this.state.name,
      surname: this.state.surname,
      number: this.state.number,
      branchId: this.state.branchId,
      selectedLessons: this.state.lessons.filter(item => item.isSelected).map(iteme => iteme.id)
    }
    axios.post('https://localhost:5001/api/students', data)
      .then(() => {
        this.props.refresh(null)
        this.props.close()
        toast.success('Kaydedildi!')
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error('Eksik bilgi gönderdildi!')
          this.setState({
            errors: error.response.data.errors
          })
        } else {
          toast.error('Bir hata meydana geldi!')
        }
      })
  }

  onChangeLesson (lesson: ISelectItem, event: any) {
    let isChecked = event.target.checked

    this.setState((state: IState) => {
      let item: ISelectableItem | undefined;
      item = state.lessons.find(item => item.id === lesson.id);

      if (!item) {
        return state
      }

      item.isSelected = isChecked
      return state
    })
  }

  render () {
    return (
      <div className="modal" style={{ display: 'block' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Öğrenci</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Okul Numarası</label>
                      <input type="text"
                        className="form-control"
                        value={this.state.number}
                        onChange={(event) => this.onChangeInput('number', event.target.value)} />
                      <ValidationError errors={this.state.errors} column="number" />
                    </div>
                    <div className="form-group">
                      <label>Ad</label>
                      <input type="text"
                        className="form-control"
                        value={this.state.name}
                        onChange={(event) => this.onChangeInput('name', event.target.value)} />
                      <ValidationError errors={this.state.errors} column="name" />
                    </div>
                    <div className="form-group">
                      <label>Soyad</label>
                      <input type="text"
                        className="form-control"
                        value={this.state.surname}
                        onChange={(event) => this.onChangeInput('surname', event.target.value)} />
                      <ValidationError errors={this.state.errors} column="surname" />
                    </div>
                    <div className="form-group">
                      <label>Şube</label>
                      <select className="form-control"
                        value={this.state.branchId}
                        onChange={this.setBranchId}>
                        {this.state.branches.map((branch) => 
                          <option key={branch.id} value={branch.id}>{branch.title}</option>
                        )}
                      </select>
                      <ValidationError errors={this.state.errors} column="branchId" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Dersler</label>
                      <table className="table">
                        <tbody>
                          {this.state
                            .lessons
                            .filter(lesson => lesson.level === this.state.selectedLevelId)
                            .map(lesson => 
                            <tr key={lesson.id}>
                              <td>
                                <div className="form-check">
                                  <input type="checkbox"
                                    className="form-check-input"
                                    checked={lesson.isSelected}
                                    onChange={(event) => this.onChangeLesson(lesson, event)}
                                    id={'lesson-check-' + lesson.id} />
                                  <label className="form-check-label" htmlFor={'lesson-check-' + lesson.id}>
                                    {lesson.title}
                                  </label>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.props.close}>Vazgeç</button>
              <button type="button"
                className="btn btn-primary"
                onClick={this.save}>Kaydet</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
