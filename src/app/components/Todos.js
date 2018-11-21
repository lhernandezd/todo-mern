import React from 'react';
import { Grid, Icon, Container, Button, Table } from 'semantic-ui-react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

export default class Todos extends React.Component {
  render() {
    return (
      <section className="Todos">
        <Container className="wrapper">
          <Grid container columns={1} >
            <TodoList />
            <TodoForm />
          </Grid>
        </Container>
      </section>
    )
  };
};
