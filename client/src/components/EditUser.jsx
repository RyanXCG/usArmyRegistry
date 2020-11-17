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
    };
  }

  componentDidMount() {
    console.log(this.props);
    const { id } = this.props.match.params;
    this.setState({ history: this.props.history });
    axios
      .get(`/api/users/${id}`)
      .then((res) => {
        console.log(res);
        let pic = btoa(
          String.fromCharCode.apply(null, res.data.avator.data.data)
        );
        this.setState({
          id: res.data._id,
          nameInput: res.data.name,
          rankInput: res.data.rank,
          sexInput: res.data.sex,
          startDateInput: res.data.startDate,
          phoneInput: res.data.phone,
          emailInput: res.data.email,
          supID: "",
          pic: pic,
        });
      })
      .catch((err) => {
        console.log("get one user fail");
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
