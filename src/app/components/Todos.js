import React from 'react';
import { Container, Card } from 'semantic-ui-react';
import Menu from './Menu';
import TodoCard from './TodoCard';

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
        this.setState({ tasks: data })
      })
  }

  handleClick(id, e) {
    const card = e.currentTarget;
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

  render() {
    return (
      <section className="todos">
        <Container>
          <Menu />
          <Card.Group className="todoList" centered itemsPerRow={4}>
            {this.state.tasks.map((task, index) =>
              <TodoCard
                key={index}
                title={task.title}
                description={task.description}
                completed={task.completed}
                date={task.updatedAt.substring(0, 10)}
                handleClick={(e) => this.handleClick(task._id, e)}
              />
            )}
          </Card.Group>
        </Container>
      </section>
    )
  };
};
