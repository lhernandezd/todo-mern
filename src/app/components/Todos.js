import React from 'react';
import { Container, Card } from 'semantic-ui-react';
import Menu from './Menu';
import TodoCard from './TodoCard';
import TodoForm from './TodoForm';
import { connect } from 'react-redux';
import { loadTodos, updateTodo, addTodo, removeTodo } from '../actions/actionCreators';

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
};

function mapDispatchToProps(dispatch) {
  return {
    loadTodos: () => dispatch(loadTodos()),
    updateTodo: (task, id) => dispatch(updateTodo(task, id)),
    addTodo: (title, description) => dispatch(addTodo(title, description)),
    removeTodo: (id) => dispatch(removeTodo(id))
  };
};

class Todos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      modalTitle: '',
      modalDescription: '',
      tasks: []
    };
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      tasks: nextProps.tasks
    });
  };

  componentDidMount() {
    this.fetchGetWithAction();
  };

  async fetchGetWithAction() {
    await this.props.loadTodos();
    this.setState({
      tasks: this.props.tasks
    });
  };

  async fetchPut(tasks, id) {
    let specificTask;
    tasks.forEach(task => {
      if (task._id === id) {
        specificTask = task
      };
    });
    await this.props.updateTodo(specificTask, id);
  };

  async addTask(e) {
    e.preventDefault();
    const title = this.state.modalTitle;
    const description = this.state.modalDescription;
    const formMessage = document.getElementById('formMessage');
    const modalInput = document.getElementById('modalInput');

    if (title === '') {
      modalInput.style.border = '1px solid #9f3a38';
      formMessage.classList.remove('hide');
    } else {
      this.switchModal();//Cierro el modal
      await this.props.addTodo(title, description);
    };
  };

  async fetchDelete(id) {
    await this.props.removeTodo(id);
  };

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
      };
    });

    this.setState({
      tasks: tasks
    });

    this.fetchPut(tasks, id);
  };

  editTask(id, e) {
    const tasks = this.state.tasks.map(task => {
      if (task._id === id) {
        return {
          ...task,
          edit: true
        }
      } else {
        return task
      };
    });

    this.setState({
      tasks: tasks
    });
  };

  updateTask(id, e) {
    e.preventDefault();
    const formTitle = document.getElementById('formTitle');
    const formDescription = document.getElementById('formDescription');
    const tasks = this.state.tasks.map(task => {
      if (task._id === id) {
        return {
          ...task,
          title: formTitle.value,
          description: formDescription.value,
          edit: false
        }
      } else {
        return task
      };
    });

    this.setState({
      tasks: tasks
    });

    this.fetchPut(tasks, id);
  };

  switchEditState(id, e) {
    const tasks = this.state.tasks.map(task => {
      if (task._id === id) {
        return {
          ...task,
          edit: false
        }
      } else {
        return task
      };
    });
    this.setState({
      tasks: tasks
    });
  };

  changeState(e) {
    if (e.target.name === 'modalTitle') {
      this.setState({
        modalTitle: e.target.value
      })
    } else if (e.target.name === 'modalDescription') {
      this.setState({
        modalDescription: e.target.value
      })
    };
  };

  deleteTask(id) {
    const tasks = this.state.tasks.filter(task => task._id !== id);
    this.setState({
      tasks: tasks
    });

    this.fetchDelete(id);
  };

  switchModal() {
    this.setState({
      modalOpen: !this.state.modalOpen,
      modalTitle: '',
      modalDescription: ''
    });
  };

  render() {
    return (
      <section className="todos">
        <Container>
          <Menu
            handleAdd={(e) => this.addTask(e)}
            handleChange={(e) => this.changeState(e)}
            modalOpen={this.state.modalOpen}
            switchModal={() => this.switchModal()}
          />
          <Card.Group className="todoList" centered stackable itemsPerRow={3}>
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
                  handleUpdate={(e) => this.updateTask(task._id, e)}
                  handleSwitch={(e) => this.switchEditState(task._id, e)}
                />
            )}
          </Card.Group>
        </Container>
      </section>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
