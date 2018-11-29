import React from 'react';
import { Form, Card, Button } from 'semantic-ui-react';

const TodoForm = (props) => {
  return (
    <section className="todoForm" style={{ margin: '14px' }}>
      <Card>
        <Card.Content>
          <Form onSubmit={props.handleUpdate} size='large'>
            <Form.Field>
              <label>Title</label>
              <input onChange={props.handleChange} placeholder={props.title} name='title' />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <input onChange={props.handleChange} placeholder={props.description} name='description' />
            </Form.Field>
            <div className='ui two buttons'>
              <Button type='submit' basic fluid color='blue'>Update</Button>
              <Button basic fluid color='red'>Cancel</Button>
            </div>
          </Form>
        </Card.Content>
      </Card>
    </section>
  )
}

export default TodoForm;
