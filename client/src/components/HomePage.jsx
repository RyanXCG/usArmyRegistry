import React, { Component } from "react";
import SearchBar from "./SearchBar";
import TableHeadAndReset from "./TableHeadAndReset";
import UserList from "./UserList";
class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>US Army Personnel Registry</h1>
        <br></br>
        <SearchBar />
        <br></br>
        <TableHeadAndReset />
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
