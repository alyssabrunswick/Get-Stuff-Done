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

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDos: {},
      progress: 0,
      showDoneBanner: true
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
    this.setState({ toDos, progress, showDoneBanner: false });
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
      this.setState({ toDos, progress, showDoneBanner: true });
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
      this.setState({ toDos, progress: 0, showDoneBanner: true });
    } else {
      let progress = this.getProgress(toDos);
      this.setState({ toDos, progress });
    }
  };

  // DELETE ALL OF THE TO-DO ITEMS
  deleteAllTodos = () => {
    const toDos = { ...this.state.toDos };
    const emptyToDos = {};
    this.setState({ toDos: emptyToDos, progress: 0, showDoneBanner: true });
  };

  componentDidUpdate() {
    localStorage.setItem('getStuffDone', JSON.stringify(this.state));
  }

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

        <div className="progress">
          <Line
            percent={this.state.progress}
            strokeWidth="1"
            strokeColor="#aca0bc"
          />
          <p>{this.state.progress}% Done</p>
        </div>

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
