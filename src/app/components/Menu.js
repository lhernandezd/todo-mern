import React from 'react';
import '../styles/Menu.css';
import { Button, Icon, Modal, Header, Form, Message, Dropdown } from 'semantic-ui-react';

const Menu = (props) => {
  const button = (
    <Button size='large' animated='fade' onClick={props.switchModal}>
      <Button.Content visible>Add task</Button.Content>
      <Button.Content hidden> <Icon name='add' /> </Button.Content>
    </Button>
  );
  const statusOptions = [
    {
      key: 'All',
      text: 'All',
      value: 'all',
      label: { color: 'grey', empty: true, circular: true }
    },
    {
      key: 'Completed',
      text: 'Completed',
      value: 'completed',
      label: { color: 'green', empty: true, circular: true }
    },
    {
      key: 'Incompleted',
      text: 'Incompleted',
      value: 'incompleted',
      label: { color: 'red', empty: true, circular: true }
    }
  ];
  return (
    <div className='menu'>
      <div className='menu__item'>
        <Modal size='tiny' trigger={button} open={props.modalOpen} closeIcon onClose={props.switchModal}>
          <Header icon='plus' content='Add Task' />
          <Modal.Content>
            <Form size='large' className='modalForm' onSubmit={props.handleAdd}>
              <Form.Field id='formMessage' className='hide'>
                <Message size='tiny' negative>
                  <Message.Header>Oops!! There was some errors with your submission </Message.Header>
                  <Message.List>
                    <Message.Item>Title Required</Message.Item>
                  </Message.List>
                </Message>
              </Form.Field>
              <Form.Field>
                <Form.Input label="Title" id='modalInput' name='modalTitle' onChange={props.handleChange} />
              </Form.Field>
              <Form.Field>
                <Form.TextArea label="Description" rows="2" name='modalDescription' onChange={props.handleChange} placeholder='Optional' />
              </Form.Field>
              <Button type='submit' basic fluid color='green'>Create</Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
      <Dropdown
        selection
        options={statusOptions}
        defaultValue={statusOptions[0].value}
        onChange={props.handleSelection}
      />
    </div>
  );
};

export default Menu;
