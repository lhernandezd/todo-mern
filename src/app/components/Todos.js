import React from 'react';
import { Container } from 'semantic-ui-react';
import Menu from './Menu';
import TodoCard from './TodoCard';

export default class Todos extends React.Component {
  render() {
    return (
      <Container className="todos">
        <Menu />
      </Container>
    )
  };
};
