import React from 'react';
import { Container, Card, Button, Icon } from 'semantic-ui-react';
import Menu from './Menu';
import TodoCard from './TodoCard';
import '../styles/Todos.css';
import { connect } from 'react-redux';
import { loadTodos, updateTodo, addTodo, removeTodo, loadDataByCompleted } from '../actions/actionCreators';

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
    removeTodo: (id) => dispatch(removeTodo(id)),
    loadDataByCompleted: (completed) => dispatch(loadDataByCompleted(completed))
  };
};

class Todos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      modalTitle: '',
      modalDescription: '',
      tasks: [],
      deleteModal: false
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

    this.fetchPut(tasks, id);
  };

  editTask(id, e) {
    const tasks = this.state.tasks.map(task => {
      if (task._id === id) {
        return {
          ...task,
          edit: !task.edit
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

    this.fetchPut(tasks, id);
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
    this.deleteModal();
    this.fetchDelete(id);
  };

  deleteModal() {
    this.setState({
      deleteModal: !this.state.deleteModal
    });
  };

  switchModal() {
    this.setState({
      modalOpen: !this.state.modalOpen,
      modalTitle: '',
      modalDescription: ''
    });
  };

  getByCompleted(e, data) {
    if (data.value === 'all') {
      this.props.loadTodos();
    } else {
      const bool = data.value === 'incompleted' ? false : true;
      this.props.loadDataByCompleted(bool);
    };
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
            handleSelection={(e, data) => this.getByCompleted(e, data)}
          />
          <Card.Group className="todoList" centered stackable itemsPerRow={3}>
            {this.state.tasks.length < 1 ?
              <div className="noResult">
                <h3>No results found</h3>
                <Button onClick={() => this.switchModal()}>
                  <Icon name='add' />
                  Add new task
                </Button>
              </div>
              :
              this.state.tasks.map((task, index) =>
                <TodoCard
                  key={index}
                  test={task.edit}
                  title={task.title}
                  description={task.description}
                  completed={task.completed}
                  date={task.updatedAt.substring(0, 10)}
                  deleteModal={this.state.deleteModal}
                  handleClick={(e) => this.handleClick(task._id, e)}
                  handleEdit={(e) => this.editTask(task._id, e)}
                  handleDelete={() => this.deleteTask(task._id)}
                  handleDeleteModal={() => this.deleteModal()}
                  handleUpdate={(e) => this.updateTask(task._id, e)}
                />
              )}
          </Card.Group>
        </Container>
      </section>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
