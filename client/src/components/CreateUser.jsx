import React, { Component } from "react";
import { addUser } from "../actions/userActions";
import { connect } from "react-redux";

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
    };
  }

  componentDidMount() {
    this.setState({ history: this.props.history });
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
            value={this.state.NameInput}
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
          <input
            value={this.state.emailInput}
            onChange={this.onEmailInputChange}
          ></input>
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
