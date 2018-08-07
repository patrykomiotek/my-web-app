import React, { Component } from 'react';

const myApiUrl = 'https://abcd-6e3c3.firebaseio.com/users';

class Message extends Component {

  state = {
    name: null,
    surname: null,
    age: null
  }

  loadData = (id) => {
    fetch(`${myApiUrl}/${id}.json`)
    .then(response => response.json())
    .then(data => {
      this.setState(data);
    });
  }

  componentWillMount() {
    this.loadData(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.loadData(nextProps.match.params.id);
    }
  }

  render() {
    return (
      <div>
        Name: {this.state.name}, Surname: {this.state.surname}, Age: {this.state.age}
      </div>
    )
  }
}

export default Message;
