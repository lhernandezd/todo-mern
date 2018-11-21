import React from 'react';
import { Container, Card } from 'semantic-ui-react';
import Menu from './Menu';
import TodoCard from './TodoCard';
import TodoForm from './TodoForm';

export default class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newData = data.map(item => {
          return {
            ...item,
            edit: false,
            formTitle: '',
            formDescription: ''
          }
        });
        console.log(newData)
        this.setState({ tasks: newData })
      })
  }

  handleClick(id, e) {
    const card = e.target;
    console.log(card);
    const tasks = this.state.tasks.map(task => {
      if (task._id === id) {
        return {
          ...task,
          completed: !task.completed
        }
      } else {
        return task
      }
    });

    this.setState({
      tasks: tasks
    })
  }

  editTask(id, e) {
    console.log(e.target)
    const tasks = this.state.tasks.map(task => {
      if (task._id === id) {
        return {
          ...task,
          edit: true
        }
      } else {
        return task
      }
    });

    this.setState({
      tasks: tasks
    });
  }

  render() {
    return (
      <section className="todos">
        <Container>
          <Menu />
          <Card.Group className="todoList" centered itemsPerRow={3}>
            {this.state.tasks.map((task, index) =>
              !task.edit ?
                <TodoCard
                  key={index}
                  title={task.title}
                  description={task.description}
                  completed={task.completed}
                  date={task.updatedAt.substring(0, 10)}
                  handleClick={(e) => this.handleClick(task._id, e)}
                  handleEdit={(e) => this.editTask(task._id, e)}
                /> :
                <TodoForm
                  key={index}
                  title={task.title}
                  description={task.description}
                  completed={task.completed}
                  date={task.updatedAt.substring(0, 10)}
                />
            )}
          </Card.Group>
        </Container>
      </section>
    )
  };
};
