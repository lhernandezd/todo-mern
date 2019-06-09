import React, { Fragment } from 'react';
import { Icon, Card, Modal, Button, Input, Label } from 'semantic-ui-react';

const TodoCard = (props) => {
  return (
    <Fragment>
      <Modal size="tiny" open={props.deleteModal} onClose={props.handleDeleteModal}>
        <Modal.Header>Delete Your Task</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this Task</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={props.handleDeleteModal} negative>No</Button>
          <Button onClick={props.handleDelete} positive content='Yes' />
        </Modal.Actions>
      </Modal>
      <Card className="todoCard" color={props.completed ? 'green' : 'red'}>
        <Card.Content>
          <Card.Header textAlign='left'>
            {props.test ?
              <Fragment>
                <Input id='formTitle' size='small' transparent defaultValue={props.title} />
                <Label color='blue' attached='top right'>Edit</Label>
              </Fragment>
              :
              props.title
            }
          </Card.Header>
          <Card.Meta textAlign='left'>Last update: {props.date}</Card.Meta>
          <Card.Description >
            {props.test ?
              <Input fluid id='formDescription' transparent defaultValue={props.description} />
              :
              props.description
            }
          </Card.Description>
        </Card.Content>
        <Card.Content extra textAlign='right'>
          <Icon link name='selected radio' onClick={props.handleClick} />
          <Icon link name='trash alternate' onClick={props.handleDeleteModal} />
          {props.test ?
            <Icon link name='save' color='blue' onClick={props.handleUpdate} />
            :
            <Icon link name='edit' onClick={props.handleEdit} />
          }
        </Card.Content>
      </Card>
    </Fragment>
  );
};

export default TodoCard;
