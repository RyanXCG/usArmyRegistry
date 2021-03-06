import React, { Component } from "react";
import { updateUser } from "../actions/userActions";
import { connect } from "react-redux";
import axios from "axios";
import "../cssFiles/createOrUpdateUser.css";

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
      allRanks: [
        "General",
        "Colonel",
        "Major",
        "Captain",
        "Lieutenant",
        "Warrant Officer",
        "Sergeant",
        "Corporal",
        "Specialist",
        "Private",
      ],
      avatorPreviewURL: null,
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
          allUsers: res.data[0].users,
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
              supID: res2.data.supID ? res2.data.supID : "",
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
    this.setState({
      avatorInput: e.target.files[0],
      avatorPreviewURL: URL.createObjectURL(e.target.files[0]),
    });
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
    console.log("submitted state: ", this.state);
    this.props.updateUser(this.state);
  };

  render() {
    return (
      <div class="updateUser">
        <h1> Edit User</h1>
        <br></br>
        <img
          src={
            this.state.avatorPreviewURL
              ? this.state.avatorPreviewURL
              : `data:image/png;base64,${this.state.pic}`
          }
          width="200"
        />
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <label>Avator: </label>
          <br></br>
          <input
            type="file"
            id="imageFileButton"
            name="image"
            onChange={this.onAvatorInputChange}
          ></input>
          <br></br>
          <br></br>
          <label>Name: </label>
          <input
            type="text"
            value={this.state.nameInput}
            onChange={this.onNameInputChange}
            required
          ></input>
          <br></br>
          <label>rank: </label>
          <br></br>
          <select
            value={this.state.rankInput}
            onChange={this.onRankInputChange}
            required
          >
            <option disabled hidden value="">
              --select an option --
            </option>
            {this.state.allRanks.map((rank) => {
              return (
                <option value={rank} key={rank}>
                  {rank}
                </option>
              );
            })}
          </select>
          <br></br>
          <label>Sex: </label>
          <br></br>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={this.onSexInputChange}
            checked={this.state.sexInput === "male"}
            required
          />
          <label htmlFor="male">Male</label>

          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={this.state.sexInput === "female"}
            onChange={this.onSexInputChange}
          />
          <label htmlFor="female">Female</label>

          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            checked={this.state.sexInput === "other"}
            onChange={this.onSexInputChange}
          />
          <label htmlFor="other">Other</label>
          <br />
          <br></br>
          <label>startDate: </label>
          <br></br>
          <input
            type="text"
            value={this.state.startDateInput}
            onChange={this.onStartDateInputChange}
            placeholder="MM/DD/YYYY"
            pattern="^(1[0-2]|0[1-9])/(3[01]|[12][0-9]|0[1-9])/[0-9]{4}$"
            required
          ></input>
          <br></br>
          <label>Phone: </label>
          <br></br>
          <input
            type="number"
            value={this.state.phoneInput}
            onChange={this.onPhoneInputChange}
            required
          ></input>
          <br></br>
          <label>Email: </label>
          <br></br>
          <input
            type="email"
            value={this.state.emailInput}
            onChange={this.onEmailInputChange}
            placeholder="example@xxxxx.xxx"
            required
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
          <button id="updateButton" type="submit">
            Update User
          </button>
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
