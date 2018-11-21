import React from 'react';
import { Grid, Icon, Card } from 'semantic-ui-react';

export default class TodoCard extends React.Component {
  render() {
    return (
      <Card onClick={this.props.handleClick} className="todoCard" style={this.props.completed ? { border: '1px solid green' } : { border: '1px solid #9f3a38' }}>
        <Card.Content>
          <Card.Header textAlign='left'>{this.props.title}</Card.Header>
          <Card.Meta textAlign='left'>{this.props.date}</Card.Meta>
          <Card.Description > {this.props.description} </Card.Description>
          <Card.Description textAlign='right'>
            <Icon link name='trash alternate' />
            <Icon link name='edit' />
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}
