import React from 'react';
import { Icon, Card } from 'semantic-ui-react';

const TodoCard = (props) => {
  return (
    <Card className="todoCard" color={props.completed ? 'green' : 'red'}>
      <Card.Content>
        <Card.Header textAlign='left'>{props.title}</Card.Header>
        <Card.Meta textAlign='left'>Last update: {props.date}</Card.Meta>
        <Card.Description > {props.description} </Card.Description>
      </Card.Content>
      <Card.Content extra textAlign='right'>
        <Icon link name='selected radio' onClick={props.handleClick} />
        <Icon link name='edit' onClick={props.handleEdit} />
        <Icon link name='trash alternate' onClick={props.handleDelete} />
      </Card.Content>
    </Card>
  );
};

export default TodoCard;
