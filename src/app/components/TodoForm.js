import React from 'react';
import { Form, Card, Button } from 'semantic-ui-react';

const TodoForm = (props) => {
  return (
    <Card>
      <Card.Content>
        <Form onSubmit={props.handleUpdate} size='large'>
          <Form.Field>
            <label>Title</label>
            <input id='formTitle' defaultValue={props.title} name='title' />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input id='formDescription' defaultValue={props.description} name='description' />
          </Form.Field>
          <div className='ui two buttons'>
            <Button type='submit' basic fluid color='blue'>Update</Button>
            <Button onClick={props.handleSwitch} basic fluid color='red'>Cancel</Button>
          </div>
        </Form>
      </Card.Content>
    </Card>
  )
};

export default TodoForm;
