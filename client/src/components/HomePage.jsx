import React, { Component } from "react";
import UserList from "./UserList";
class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>US Army Personnel Registry</h1>
        <UserList />
        <br></br>
        <br></br>
        <button onClick={() => this.props.history.push("/createUser")}>
          Create New User
        </button>
      </div>
    );
  }
}

export default HomePage;
