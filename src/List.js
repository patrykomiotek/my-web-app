import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { myApiUrl } from './constants';

class List extends Component {

  state = {
    id: '',
    name: '',
    surname: '',
    age: '',
    list: []
  }

  createHandler = () => {
    const request = {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        surname: this.state.surname,
        age: this.state.age
      })
    };

    fetch(`${myApiUrl}/users.json`, request)
    .then(response => response.json())
    .then(data => {
      this.setState({
        name: '',
        surname: '',
        age: ''
      });
      this.loadData();
    });
  }

  updateHandler = () => {
    const request = {
      method: 'PUT',
      body: JSON.stringify({
        name: this.state.name,
        surname: this.state.surname,
        age: this.state.age
      })
    };

    fetch(`${myApiUrl}/users/${this.state.id}.json`, request)
    .then(response => response.json())
    .then(data => {
      this.loadData();
    });
  }

  handleChange = (event) => {
    const fieldName = event.target.name;
    this.setState({
      [fieldName]: event.target.value
    });
  }

  loadData = () => {
    fetch(`${myApiUrl}/users.json`)
    .then(response => response.json())
    .then(responseData => {
      const firebaseArray = Object.entries(responseData || {});
      const firebaseData = firebaseArray.map(item => {
        return {
          id: item[0],
          ...item[1]
        }
      });
      this.setState({
        list: firebaseData
      });
    });
  }

  componentWillMount() {
    this.loadData();
  }

  removeHandler = (id) => {
    const request = {
      method: 'DELETE'
    };
    fetch(`${myApiUrl}/users/${id}.json`, request)
    .then(response => response.json())
    .then(data => {
      this.loadData();
    });
  }

  editHandler = (obj) => {
    this.setState({
      id: obj.id,
      name: obj.name,
      surname: obj.surname,
      age: obj.age
    });
  }

  clickHandler = (obj) => {
    this.setState({
      id: obj.id,
      name: obj.name,
      surname: obj.surname,
      age: obj.age
    });
  }

  render() {
    return (
      <div>
        Name: <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
        Surname: <input type="text" name="surname" onChange={this.handleChange} value={this.state.surname} />
        Age: <input type="number" name="age" onChange={this.handleChange} value={this.state.age} />
        <button onClick={this.createHandler}>Create me</button>
        <button onClick={this.updateHandler}>Update me</button>
      <div>
        <ul>
          {this.state.list.map((item) => (
            <li key={item.id}>
              <Link to={`/user/${item.id}`}>
                {item.surname}
              </Link>
              <button onClick={() => this.editHandler(item)}>Edit</button>
              <button onClick={() => this.removeHandler(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      </div>
    );
  }
}

export default List;
