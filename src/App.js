import React, { Component } from 'react';
import logo from './logo.svg';

import 'normalize.css';
import './App.css';

import ToDoList from './components/ToDoList/ToDoList';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
        </header>
        <ToDoList></ToDoList>
      </div>
    );
  }
}

export default App;
