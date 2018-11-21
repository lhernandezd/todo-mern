import React from 'react';
import { Form, Card, Button } from 'semantic-ui-react';

export default class TodoForm extends React.Component {
  render() {
    return (
      <section className="todoForm">
        <Card>
          <Card.Content>
            <Form onSubmit={this.props.handleUpdate} size='large'>
              <Form.Field>
                <label>Title</label>
                <input onChange={this.props.handleChange} placeholder={this.props.title} name='title' />
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <input onChange={this.props.handleChange} placeholder={this.props.description} name='description' />
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
}
