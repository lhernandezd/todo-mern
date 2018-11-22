import React from 'react';
import { Container, Card } from 'semantic-ui-react';
import Menu from './Menu';
import TodoCard from './TodoCard';
import TodoForm from './TodoForm';

export default class Todos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalTitle: '',
      modalDescription: '',
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

  fetchPut(tasks, id) {
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

    this.fetchPut(tasks, id);
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

    this.fetchPut(tasks, id);
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

  addTask(e) {
    e.preventDefault();

    const title = this.state.modalTitle;
    const description = this.state.modalDescription;

    console.log({ title, description })

    fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))

    this.fetchData();
  }

  changeState(e) {
    if (e.target.name === 'modalTitle') {
      this.setState({
        modalTitle: e.target.value
      })
    } else if (e.target.name === 'modalDescription') {
      this.setState({
        modalDescription: e.target.value
      })
    }
  }

  fetchDelete(id) {
    fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

  deleteTask(id) {
    const tasks = this.state.tasks.filter(task => task._id !== id);
    console.log(tasks)
    this.setState({
      tasks: tasks
    });

    this.fetchDelete(id);
  }

  render() {
    return (
      <section className="todos">
        <Container>
          <Menu handleAdd={(e) => this.addTask(e)} handleChange={(e) => this.changeState(e)} />
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
                  handleDelete={() => this.deleteTask(task._id)}
                /> :
                <TodoForm
                  key={index}
                  title={task.title}
                  description={task.description}
                  completed={task.completed}
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
