import React from 'react';
import '../styles/Menu.css';
import { Button, Icon, Modal, Header, Form } from 'semantic-ui-react';

export default class Menu extends React.Component {
  render() {
    const button = (
      <Button basic color="black" size="large" animated="fade">
        <Button.Content visible>Add task</Button.Content>
        <Button.Content hidden> <Icon name="add" /> </Button.Content>
      </Button>
    )
    return (
      <div className="menu">
        <div className="menu__item">
          <Modal trigger={button} closeIcon>
            <Header icon='plus' content='Add Task' />
            <Modal.Content>
              <Form size='large'>
                <Form.Field>
                  <label>Title</label>
                  <input name='title' />
                </Form.Field>
                <Form.Field>
                  <label>Description</label>
                  <input name='description' />
                </Form.Field>
                <div className='ui two buttons'>
                  <Button type='submit' basic fluid color='green'>Create</Button>
                  <Button basic fluid color='red'>Cancel</Button>
                </div>
              </Form>
            </Modal.Content>
          </Modal>
        </div>
        <div className="menu__info">
          <span className="info__icon"><Icon name="info circle" />:</span>
          <span className="info__text--completed">Completed</span>
          <span className="info__text--incompleted">Incompleted</span>
        </div>
      </div>
    )
  }
}
