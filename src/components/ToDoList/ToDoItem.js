// @flow
/*
   NOTE: This file was auto-generated for a component
   named "ToDoItem"; it is intended to be modified as
   needed to be useful.
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class ToDoItem extends Component {
  static propTypes = {
    toDoItem: PropTypes.shape({
      text: PropTypes.string,
      status: PropTypes.bool
    }),
    deleteToDo: PropTypes.func,
    updateChecked: PropTypes.func
  };

  getClassNames = () => {

    return classNames('item', {
      checked: this.props.toDoItem.checked
    });
};

  render() {
    return (
      <li className={this.getClassNames()}>
        <label onClick={() => this.props.updateChecked(this.props.index)}>
          <input type="checkbox" checked={this.props.toDoItem.checked} onChange={() => this.props.updateChecked(this.props.index)} />
          <span>{this.props.toDoItem.text}</span>
        </label>
        <button onClick={() => this.props.deleteToDo(this.props.index)}>x</button>
      </li>
    );
  }
}

export default ToDoItem;
