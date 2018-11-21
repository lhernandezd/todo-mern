import React from 'react';
import { Container, Card } from 'semantic-ui-react';
import Menu from './Menu';
import TodoCard from './TodoCard';
import TodoForm from './TodoForm';

export default class Todos extends React.Component {
  constructor(props) {
    super(props);

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

  updateTask(id, e) {
    e.preventDefault();

    const tasks = this.state.tasks.map(task => {
      if (task._id === id) {
        return {
          ...task,
          title: task.formTitle,
          description: task.formDescription,
          edit: false
        }
      } else {
        return task
      }
    });

    this.setState({
      tasks: tasks
    });

    let specificTask;
    tasks.forEach(task => {
      if (task._id === id) {
        specificTask = task
      }
    })

    fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(specificTask),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

  changeProperties(id, e) {
    const tasks = this.state.tasks.map(task => {
      if (task._id === id && e.target.name === 'title') {
        return {
          ...task,
          formTitle: e.target.value
        }
      } else if (task._id === id && e.target.name === 'description') {
        return {
          ...task,
          formDescription: e.target.value
        }
      } else {
        return task
      }
    })

    this.setState({
      tasks: tasks
    })
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
                  handleChange={(e) => this.changeProperties(task._id, e)}
                  handleUpdate={(e) => this.updateTask(task._id, e)}
                />
            )}
          </Card.Group>
        </Container>
      </section>
    )
  };
};
