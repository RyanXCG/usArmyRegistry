import React, { Component } from "react";
import SearchBar from "./SearchBar";
import TableHeadAndReset from "./TableHeadAndReset";
import UserList from "./UserList";
import "../cssFiles/homePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="homePage">
        <h1>US Army Personnel Registry</h1>
        <br></br>
        <SearchBar />
        <br></br>
        <TableHeadAndReset />
        <UserList />
        <br></br>
        <br></br>
        <button
          id="newSoldier"
          onClick={() => this.props.history.push("/createUser")}
        >
          {<FontAwesomeIcon icon={faUserPlus} />} New Soldier
        </button>
      </div>
    );
  }
}

export default HomePage;
