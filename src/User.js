import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { myApiUrl } from './constants';

class User extends Component {

  state = {
    name: null,
    surname: null,
    age: null
  }

  loadData = (id) => {
    fetch(`${myApiUrl}/users/${id}.json`)
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
        <div>
          <ul>
            <li>Name: {this.state.name}</li>
            <li>Surname: {this.state.surname}</li>
            <li>Age: {this.state.age}</li>
          </ul>
        </div>
        <div>
          <Link to="/">Back to home</Link>
        </div>
      </div>
    )
  }
}

export default User;
