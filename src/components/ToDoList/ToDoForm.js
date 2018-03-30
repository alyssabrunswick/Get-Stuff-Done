import React, { Component } from "react";
import PropTypes from "prop-types";

class ToDoForm extends Component {
  toDoRef = React.createRef();

  static propTypes = {
    addToDo: PropTypes.func
  };

  addToDoItem = event => {
    event.preventDefault();

    if (
      this.toDoRef.current.value !== null &&
      this.toDoRef.current.value !== undefined &&
      this.toDoRef.current.value !== ""
    ) {
      const item = {
        text: this.toDoRef.current.value,
        checked: false
      };
      this.props.addToDo(item);
      event.currentTarget.reset();
    }
  };

  render() {
    return (
      <form className="inline-form" onSubmit={this.addToDoItem}>
        <input
          name="name"
          id="toDo"
          ref={this.toDoRef}
          type="text"
          placeholder="Add to-do item"
        />
        <button type="submit">+</button>
      </form>
    );
  }
}

export default ToDoForm;
