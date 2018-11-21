import React from 'react';
import { Container, Card } from 'semantic-ui-react';
import Menu from './Menu';
import TodoCard from './TodoCard';

export default class Todos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        {
          title: 'Task 1',
          description: 'The first test task',
          completed: false,
          date: Date()
        },
        {
          title: 'Task 2',
          description: 'The second test task',
          completed: true,
          date: Date()
        },
        {
          title: 'Task 2',
          description: 'The second test task',
          completed: true,
          date: Date()
        },
        {
          title: 'Task 2',
          description: 'The second test task',
          completed: true,
          date: Date()
        },
        {
          title: 'Task 1',
          description: 'The first test task',
          completed: false,
          date: Date()
        }
      ]
    };
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
                date={task.date}
              />
            )}
          </Card.Group>
        </Container>
      </section>
    )
  };
};
