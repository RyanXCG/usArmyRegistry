import React, { Component } from "react";
import { updateUser } from "../actions/userActions";
import { connect } from "react-redux";
import axios from "axios";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      avatorInput: null,
      nameInput: "",
      rankInput: "",
      sexInput: "",
      startDateInput: "",
      phoneInput: "",
      emailInput: "",
      supID: "",
      history: null,
      pic: null,
      allUsers: [],
    };
  }

  componentDidMount() {
    console.log(this.props);
    const { id } = this.props.match.params;
    this.setState({ history: this.props.history });
    // get all the users
    const page = 1000000;
    const search = "";
    const sortMethod = "name";
    const sortDir = 1;
    axios
      .get(
        `/api/users?page=${page}&search=${search}&sortMethod=${sortMethod}&sortDir=${sortDir}`
      )
      .then((res) => {
        console.log("all users", res.data);
        this.setState({
          allUsers: res.data,
        });
        axios
          .get(`/api/users/${id}`)
          .then((res2) => {
            console.log("res2: ", res2);
            let allChildrenIDs = res2.data.allChildren.map(({ _id }) => _id);
            // allChildrens Should include the user itself
            allChildrenIDs.push(id);
            console.log(allChildrenIDs);
            let validSups = this.state.allUsers.filter(
              (user) => !allChildrenIDs.includes(user._id)
            );
            validSups.push({
              _id: "",
              name: "no superior selected",
              email: "N/A",
            });
            console.log(validSups);
            this.setState({
              id: id,
              nameInput: res2.data.name,
              rankInput: res2.data.rank,
              sexInput: res2.data.sex,
              startDateInput: res2.data.startDate,
              phoneInput: res2.data.phone,
              emailInput: res2.data.email,
              supID: res2.data.supInfo._id,
              pic: res2.data.avator.data,
              allUsers: validSups,
            });
          })
          .catch((err) => {
            console.log("get one user fail");
          });
      })
      .catch((err) => {
        console.log("get all users for selection fail");
      });
  }

  onAvatorInputChange = (e) => {
    this.setState({ avatorInput: e.target.files[0] });
  };

  onNameInputChange = (e) => {
    this.setState({ nameInput: e.target.value });
  };

  onRankInputChange = (e) => {
    this.setState({ rankInput: e.target.value });
  };

  onSexInputChange = (e) => {
    this.setState({ sexInput: e.target.value });
  };

  onStartDateInputChange = (e) => {
    this.setState({ startDateInput: e.target.value });
  };

  onPhoneInputChange = (e) => {
    this.setState({ phoneInput: e.target.value });
  };

  onEmailInputChange = (e) => {
    this.setState({ emailInput: e.target.value });
  };

  onSelectSuperiorChange = (e) => {
    this.setState({ supID: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.updateUser(this.state);
  };

  render() {
    return (
      <div>
        <h1> Edit User</h1>
        <label>Current Avator: </label>
        <br></br>
        <img src={`data:image/png;base64,${this.state.pic}`} width="200" />
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <label>Avator: </label>
          <br></br>
          <input
            type="file"
            id="image"
            name="image"
            onChange={this.onAvatorInputChange}
            required
          ></input>
          <br></br>
          <br></br>
          <label>Name: </label>
          <br></br>
          <input
            value={this.state.nameInput}
            onChange={this.onNameInputChange}
          ></input>
          <br></br>
          <label>rank: </label>
          <br></br>
          <input
            value={this.state.rankInput}
            onChange={this.onRankInputChange}
          ></input>
          <br></br>
          <label>Sex: </label>
          <br></br>
          <input
            value={this.state.sexInput}
            onChange={this.onSexInputChange}
          ></input>
          <br></br>
          <label>startDate: </label>
          <br></br>
          <input
            value={this.state.startDateInput}
            onChange={this.onStartDateInputChange}
          ></input>
          <br></br>
          <label>Phone: </label>
          <br></br>
          <input
            value={this.state.phoneInput}
            onChange={this.onPhoneInputChange}
          ></input>
          <br></br>
          <label>Email: </label>
          <br></br>
          <input
            value={this.state.emailInput}
            onChange={this.onEmailInputChange}
          ></input>
          <br></br>
          <label>Superior</label>
          <br></br>
          <select
            name="allUsers"
            value={this.state.supID}
            onChange={this.onSelectSuperiorChange}
          >
            {this.state.allUsers.map((user) => {
              return (
                <option value={user._id} key={user._id}>
                  {user.name}: {user.email}
                </option>
              );
            })}
          </select>
          <br></br>
          <br></br>
          <button type="submit">Update User</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (input) => {
      dispatch(updateUser(input));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
