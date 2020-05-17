import React from 'react';
import axios from 'axios'
import ISelectItem from './../shared/interfaces/ISelectItem'
import StudentModel from './StudentModel'

interface IState {
  id: number|null,
  name: string,
  surname: string,
  number: string,
  branchId: number,
  branches: ISelectItem[]
}

interface IProps {
  student: StudentModel|null,
  refresh (page: number|null): void,
  close (): void
}

export default class StudentModal extends React.Component<IProps> {
  state: IState;

  constructor (props: IProps) {
    super(props);
    this.state = {
      id: null,
      name: '',
      surname: '',
      number: '',
      branchId: -1,
      branches: []
    }
    this.onChangeInput = this.onChangeInput.bind(this);
    this.setBranchId = this.setBranchId.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount () {
    axios.get('https://localhost:5001/api/branches').then((response) => {
      this.setState({
        branchId: response.data[0].id,
        branches: response.data.map((item: any) => {
          return {
            id: item.id,
            title: item.title
          }
        })
      })
      if (this.props.student) {
        this.setState({
          id: this.props.student.id,
          name: this.props.student.name,
          surname: this.props.student.surname,
          number: this.props.student.studentNo,
          branchId: this.props.student.branchId
        })  
      }
    })
  }

  onChangeInput (name: string, value: string) {
    this.setState({
      [name]: value
    })
  }

  setBranchId (event: any) {
    this.setState({
      branchId: parseInt(event.target.value)
    })
  }
  
  save () {
    const data = {
      id: this.state.id,
      name: this.state.name,
      surname: this.state.surname,
      number: this.state.number,
      branchId: this.state.branchId,
    }
    axios.post('https://localhost:5001/api/students', data)
      .then(() => {
        this.props.refresh(null)
        this.props.close()
      })
  }

  render () {
    return (
      <div className="modal" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Öğrenci</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Okul Numarası</label>
                  <input type="text"
                    className="form-control"
                    value={this.state.number}
                    onChange={(event) => this.onChangeInput('number', event.target.value)} />
                </div>
                <div className="form-group">
                  <label>Ad</label>
                  <input type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={(event) => this.onChangeInput('name', event.target.value)} />
                </div>
                <div className="form-group">
                  <label>Soyad</label>
                  <input type="text"
                    className="form-control"
                    value={this.state.surname}
                    onChange={(event) => this.onChangeInput('surname', event.target.value)} />
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
