import React, { Component } from "react";
import { addUser } from "../actions/userActions";
import { connect } from "react-redux";
import axios from "axios";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatorInput: null,
      nameInput: "",
      rankInput: "",
      sexInput: "",
      startDateInput: "",
      phoneInput: "",
      emailInput: "",
      supID: "",
      history: null,
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
      avatorPreviewURL: process.env.PUBLIC_URL + "/defaultUSArmy.png",
    };
  }

  componentDidMount() {
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
        console.log(res);
        this.setState({
          allUsers: [
            { _id: "", name: "no superior selected", email: "N/A" },
            ...res.data,
          ],
        });
      })
      .catch((err) => {
        console.log("get all users for selection fail");
      });
  }

  onAvatorInputChange = (e) => {
    console.log(e.target.files[0]);
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
    console.log(this.state);
    this.props.addUser(this.state);
  };

  render() {
    return (
      <div>
        <h1> Create New User</h1>
        <form onSubmit={this.handleSubmit}>
          <img src={this.state.avatorPreviewURL} width="200" />
          <br></br>
          <label>Avator: </label>
          <br></br>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png"
            onChange={this.onAvatorInputChange}
          ></input>
          <br></br>
          <br></br>
          <label>Name: </label>
          <br></br>
          <input
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
            required
          />
          <label htmlFor="male">Male</label>
          <br />
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={this.onSexInputChange}
          />
          <label htmlFor="female">Female</label>
          <br />
          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            onChange={this.onSexInputChange}
          />
          <label htmlFor="other">Other</label>
          <br />
          <br></br>
          <label>startDate: </label>
          <br></br>
          <input
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
          <button type="submit">Add User</button>
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
    addUser: (input) => {
      dispatch(addUser(input));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
