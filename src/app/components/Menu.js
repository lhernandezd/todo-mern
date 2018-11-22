import React from 'react';
import '../styles/Menu.css';
import { Button, Icon, Modal, Header, Form } from 'semantic-ui-react';

export default class Menu extends React.Component {
  render() {
    const button = (
      <Button basic color='black' size='large' animated='fade' onClick={this.props.switchModal}>
        <Button.Content visible>Add task</Button.Content>
        <Button.Content hidden> <Icon name='add' /> </Button.Content>
      </Button>
    )
    return (
      <div className='menu'>
        <div className='menu__item'>
          <Modal trigger={button} open={this.props.modalOpen} closeIcon onClose={this.props.switchModal}>
            <Header icon='plus' content='Add Task' />
            <Modal.Content>
              <Form size='large' className='modalForm' onSubmit={this.props.handleAdd}>
                <Form.Field>
                  <label>Title</label>
                  <input name='modalTitle' onChange={this.props.handleChange} />
                </Form.Field>
                <Form.Field>
                  <label>Description</label>
                  <input name='modalDescription' onChange={this.props.handleChange} />
                </Form.Field>
                <Button type='submit' basic fluid color='green'>Create</Button>
              </Form>
            </Modal.Content>
          </Modal>
        </div>
        <div className='menu__info'>
          <span className='info__icon'><Icon name='info circle' />:</span>
          <span className='info__text--completed'>Completed</span>
          <span className='info__text--incompleted'>Incompleted</span>
        </div>
      </div>
    )
  }
}
