// @flow
/*
   NOTE: This file was auto-generated for a component
   named "ToDoList"; it is intended to be modified as
   needed to be useful.
*/

import React, { Component } from "react";
import ToDoForm from "./ToDoForm";
import ToDoItem from "./ToDoItem";

function DoneBanner(props) {
  if (!props.show) {
    return <h1>Things to get done: </h1>;
  }

  return (
    <div>
      <h2>Hooray! You don't have anything to get done!</h2>
      <img src="/images/hooray.gif" alt="Hooray!"/>
    </div>
  );
}

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDos: {},
      showDoneBanner: true
    };
  }

  addToDo = toDo => {
    const toDos = { ...this.state.toDos };
    toDos[`toDo${Date.now()}`] = toDo;
    this.setState({ toDos, showDoneBanner: false });
  };

  updateToDo = (key, updatedToDo) => {
    const toDos = { ...this.state.toDos };
    toDos[key] = updatedToDo;
    this.setState({ toDos });
  };

  deleteToDo = key => {
    const toDos = { ...this.state.toDos };
    delete toDos[key];
    if (Object.keys(toDos).length === 0) {
      this.setState({ toDos, showDoneBanner: true });
    } else {
      this.setState({ toDos });
    }
  };

  updateChecked = (key) => {
    const toDos = { ...this.state.toDos };
    toDos[key].checked = !toDos[key].checked;
    this.setState({ toDos });
  }

  deleteAllTodos = () => {
    const toDos = { ...this.state.toDos };
    const emptyToDos = {};
    this.setState({ toDos: emptyToDos, showDoneBanner: true });
  };

  deleteDoneToDos = () => {
    const toDos = { ...this.state.toDos };
    Object.entries(toDos).forEach(([key, value]) => {
      if(value.checked === true) {
        delete toDos[key];
      }
    });
    this.setState({ toDos });
  };

  completeAllTodos = () => {
    const toDos = { ...this.state.toDos };
    Object.entries(toDos).forEach(([key, value]) => {
      value.checked = true;
    });
    this.setState({ toDos });
  };

  render() {

    return (
      <div className="content">

        <DoneBanner show={this.state.showDoneBanner} />
        <ul className="list">
          {Object.keys(this.state.toDos).map(key => (
            <ToDoItem
              key={key}
              index={key}
              toDoItem={this.state.toDos[key]}
              deleteToDo={this.deleteToDo}
              updateChecked={this.updateChecked}
            />
          ))}
        </ul>
        <ToDoForm
          addToDo={this.addToDo}
          updateToDo={this.updateToDo}
          deleteToDo={this.deleteToDo}
        />
        <div className="button-group">
          <button onClick={this.deleteDoneToDos}>Delete those Marked as Done</button>
          <button onClick={this.completeAllTodos}>Mark All As Done</button>
          <button className="action" onClick={this.deleteAllTodos}>Delete All</button>
        </div>
      </div>
    );
  }
}

export default ToDoList;
