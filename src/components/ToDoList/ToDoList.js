import React, { Component } from "react";
import ToDoForm from "./ToDoForm";
import ToDoItem from "./ToDoItem";
import { Line } from "rc-progress";

function DoneBanner(props) {
  if (!props.show) {
    return <h1>Things to get done: </h1>;
  }

  return (
    <div>
      <h2>Hooray! You don't have anything to get done!</h2>
      <img src="/images/hooray.gif" alt="Hooray!" />
    </div>
  );
}

function ProgressBar(props) {
  if (props.show) {
    return null;
  }

  return (
    <div className="progress">
    <Line
      percent={props.progress}
      strokeWidth="1"
      strokeColor="#aca0bc"
    />
    <p>{props.progress}% Done</p>
  </div>
  );
}

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDos: {},
      progress: 0,
      emptyList: true
    };
  }

  componentDidMount() {
    const localStorageRef = localStorage.getItem('getStuffDone');
    if (localStorageRef) {
      this.setState(JSON.parse(localStorageRef));
    }
  }

  // GET TOTAL-DONE PROGRESS
  getProgress = toDos => {
    const total = Object.keys(toDos).length;
    let done = 0;

    Object.entries(toDos).forEach(([key, value]) => {
      if (value.checked === true) {
        done++;
      }
    });
    return Math.round(done / total * 100);
  };

  // ADD TO-DO ITEM
  addToDo = async toDo => {
    const toDos = { ...this.state.toDos };
    toDos[`toDo${Date.now()}`] = toDo;
    let progress = await this.getProgress(toDos);
    this.setState({ toDos, progress, emptyList: false });
  };

  // MARK AS DONE/NOT DONE
  updateChecked = key => {
    const toDos = { ...this.state.toDos };
    toDos[key].checked = !toDos[key].checked;
    let progress = this.getProgress(toDos);
    this.setState({ toDos, progress });
  };

  // DELETE A SINGLE TO-DO ITEM
  deleteToDo = key => {
    const toDos = { ...this.state.toDos };
    delete toDos[key];

    if (Object.keys(toDos).length === 0) {
      let progress = this.getProgress(toDos);
      this.setState({ toDos, progress: 0, emptyList: true });
    } else {
      let progress = this.getProgress(toDos);
      this.setState({ toDos, progress });
    }
  };

  // MARK ALL OF THE TO-DO ITEMS AS DONE
  completeAllTodos = () => {
    const toDos = { ...this.state.toDos };
    Object.entries(toDos).forEach(([key, value]) => {
      value.checked = true;
    });
    const progress = 100;
    this.setState({ toDos, progress });
  };

  // DELETE ALL OF THE DONE TO-DO ITEMS
  deleteDoneToDos = () => {
    const toDos = { ...this.state.toDos };
    Object.entries(toDos).forEach(([key, value]) => {
      if (value.checked === true) {
        delete toDos[key];
      }
    });

    if (Object.keys(toDos).length === 0) {
      this.setState({ toDos, progress: 0, emptyList: true });
    } else {
      let progress = this.getProgress(toDos);
      this.setState({ toDos, progress });
    }
  };

  // DELETE ALL OF THE TO-DO ITEMS
  deleteAllTodos = () => {
    const toDos = { ...this.state.toDos };
    const emptyToDos = {};
    this.setState({ toDos: emptyToDos, progress: 0, emptyList: true });
  };

  componentDidUpdate() {
    localStorage.setItem('getStuffDone', JSON.stringify(this.state));
  }

  render() {
    return (
      <div className="content">
        <DoneBanner show={this.state.emptyList} />

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

        <ProgressBar show={this.state.emptyList} progress={this.state.progress} />

        <ToDoForm
          addToDo={this.addToDo}
          deleteToDo={this.deleteToDo}
        />
        <div className="button-group">
          <button onClick={this.completeAllTodos}>Mark All As Done</button>
          <button className="btn-primary" onClick={this.deleteDoneToDos}>
            Delete those Marked as Done
          </button>
          <button className="btn-action" onClick={this.deleteAllTodos}>
            Delete All
          </button>
        </div>
      </div>
    );
  }
}

export default ToDoList;
