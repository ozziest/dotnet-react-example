import React from 'react';

interface IProps {
  data: any,
  setFilter: any
}

interface ISelect {
  title: string,
  id: number
}

interface IState {
  value: any,
  lessons: ISelect[]
}

export default class LessonFilter extends React.Component<IProps, IState> {
  state: IState;

  constructor (props: IProps) {
    super(props);
    this.state = {
      value: this.props.data.filters.lesson,
      lessons: [
        { title: 'Tümü', id: -1 },
        { title: "Matematik", id: 1 },
        { title: "Türkçe", id: 2 },
        { title: "Fen Bilgisi", id: 3 }
      ]
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event: any) {
    this.setState({
      value: event.target.value
    })
    this.props.setFilter(event.target.value)
  }

  render () {
    return (
      <div className="form-group">
        <label>Ders</label>
        <select className="form-control" value={this.state.value} onChange={this.handleChange}>
          {this.state.lessons.map((lesson) => 
            <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
          )}
        </select>
      </div>
    );
  }
}
