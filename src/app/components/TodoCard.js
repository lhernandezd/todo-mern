import React from 'react';
import { Icon, Card } from 'semantic-ui-react';

export default class TodoCard extends React.Component {
  render() {
    return (
      <Card className="todoCard" style={this.props.completed ? { border: '1px solid green' } : { border: '1px solid #9f3a38' }}>
        <Card.Content>
          <Card.Header textAlign='left'>{this.props.title}</Card.Header>
          <Card.Meta textAlign='left'>{this.props.date}</Card.Meta>
          <Card.Description > {this.props.description} </Card.Description>
          <Card.Description textAlign='right'>
            <Icon link name='selected radio' onClick={this.props.handleClick} />
            <Icon link name='edit' onClick={this.props.handleEdit} />
            <Icon link name='trash alternate' onClick={this.props.handleDelete} />
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}
