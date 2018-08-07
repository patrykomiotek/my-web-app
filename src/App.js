import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import User from './User';
import List from './List';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={List} />
            <Route path="/user/:id" component={User} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
