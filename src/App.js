import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';
import Message from './Message';

const myApiUrl = 'https://abcd-6e3c3.firebaseio.com/users';

class App extends Component {

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

    fetch(`${myApiUrl}.json`, request)
    .then(response => response.json())
    .then(data => {
      console.log('GREAT SUCCESS!!');
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

    fetch(`${myApiUrl}/${this.state.id}.json`, request)
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
    fetch(`${myApiUrl}.json`)
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
    fetch(`${myApiUrl}/${id}.json`, request)
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
      <div className="App">
        <Router>
          <div>
            <Route path="/messages/:id" component={Message} />

            <div>
                Wybrany obiekt: {this.state.name} {this.state.surname}
              </div>
                Name: <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
                Surname: <input type="text" name="surname" onChange={this.handleChange} value={this.state.surname} />
                Age: <input type="number" name="age" onChange={this.handleChange} value={this.state.age} />
                <button onClick={this.createHandler}>Create me</button>
                <button onClick={this.updateHandler}>Update me</button>
              <div>
                <ul>
                  {this.state.list.map((item) => (
                    <li key={item.id}>
                      <Link to={`/messages/${item.id}`}>
                        {item.surname}
                      </Link>
                      <button onClick={() => this.editHandler(item)}>Edit</button>
                      <button onClick={() => this.removeHandler(item.id)}>Remove</button>
                    </li>
                  ))}
                </ul>
              </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
