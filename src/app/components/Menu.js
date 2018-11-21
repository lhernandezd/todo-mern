import React from 'react';
import '../styles/Menu.css';
import { Button, Icon } from 'semantic-ui-react';

export default class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <div className="menu__item">
          <Button size="large" animated="fade">
            <Button.Content visible>Add task</Button.Content>
            <Button.Content hidden> <Icon name="add" /> </Button.Content>
          </Button>
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
