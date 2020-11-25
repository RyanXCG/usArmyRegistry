import { React, Component } from "react";
import { getUsers, deleteUser, getUsersByIDs } from "../actions/userActions";
import { addPage } from "../actions/pageAction";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { withRouter } from "react-router";
import "../cssFiles/userList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-regular-svg-icons";
class UserList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsers(this.props.pageInfo);
  }

  onDeleteClicked(id, supID) {
    console.log("onDeleteClicked", id, supID);
    this.props.deleteUser(id, supID, this.props.pageInfo);
  }

  onEditClicked(user) {
    this.props.history.push(`/editUser/${user._id}`);
  }

  onPhoneClicked(phone) {
    //window.location.href = `tel: ${phone}`;
    window.location.href = `skype: ${phone}`;
  }

  onEmailClicked(email) {
    window.location.href = `mailto: ${email}`;
  }

  onSupNameClicked(IDs) {
    console.log("supID", IDs);
    IDs[0] && this.props.getUsersByIDs(IDs);
  }

  onNumOfDSClicked(IDs) {
    IDs.length && this.props.getUsersByIDs(IDs);
  }

  // infinite scroll functions
  fetchMoreData = () => {
    // once made sure there's more data
    // get more user date
    //console.log("pageInfo at adding more: ", this.props.pageInfo.state);
    this.props.getUsers({
      ...this.props.pageInfo,
      page: this.props.pageInfo.page + 1,
    });
    // update page number in redux
    this.props.addPage();
  };

  render() {
    const { isFetching, data, err } = this.props.users;
    if (isFetching || !data) {
      console.log("fetching");
      return <div>loading the data...</div>;
    } else {
      if (err) {
        return <div>There was an error to get the data</div>;
      } else {
        if (data[0]) {
          console.log(data[0]);
          console.log(
            "the true search count",
            this.props.users.data[0].searchCount[0]
              ? this.props.users.data[0].searchCount[0].count
              : 0
          );
          console.log("data Count", this.props.users.data[0].users.length);
          return (
            <div className="infiniteScroll">
              <InfiniteScroll
                dataLength={data[0].users.length}
                next={this.fetchMoreData}
                hasMore={
                  this.props.users.data[0].users.length <
                  (this.props.users.data[0].searchCount[0]
                    ? this.props.users.data[0].searchCount[0].count
                    : 0)
                }
                loader={<h4>Loading...</h4>}
                height={200}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>You have reached the bottom</b>
                  </p>
                }
              >
                <table className="users">
                  <tbody>
                    {data[0].users.map((user) => {
                      return (
                        <tr className="bodyRows" key={user._id}>
                          <td
                            className="clickable edit"
                            onClick={() => this.onEditClicked(user)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </td>
                          <td
                            className="clickable delete"
                            onClick={() =>
                              this.onDeleteClicked(
                                user._id,
                                user.supID ? user.supID : ""
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </td>
                          <td className="avator">
                            <img
                              src={`data:image/png;base64,${user.avator.data}`}
                              width="50px"
                            />
                          </td>
                          <td className="name">{user.name}</td>
                          <td className="sex">{user.sex}</td>
                          <td className="rank">{user.rank}</td>
                          <td className="startDate">{user.startDate}</td>
                          <td
                            className="clickable phone"
                            onClick={() => this.onPhoneClicked(user.phone)}
                          >
                            {user.phone}
                          </td>
                          <td
                            className="clickable email"
                            onClick={() => this.onEmailClicked(user.email)}
                          >
                            {user.email}
                          </td>
                          <td
                            className="clickable supName"
                            onClick={() => this.onSupNameClicked([user.supID])}
                          >
                            {user.supName.length !== 0 && user.supName[0].name}
                          </td>
                          <td
                            className="clickable numDS"
                            onClick={() =>
                              this.onNumOfDSClicked(
                                user.subs.map((obj) => obj._id)
                              )
                            }
                          >
                            {user.subs.length !== 0 && user.subs.length}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </InfiniteScroll>
            </div>
          );
        } else {
          return <div>loading the freaking data</div>;
        }
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.userReducer,
    pageInfo: state.pageInfoReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (params) => {
      dispatch(getUsers(params));
    },
    deleteUser: (id, supID, pageInfo) => {
      dispatch(deleteUser(id, supID, pageInfo));
    },
    addPage: () => {
      dispatch(addPage());
    },
    getUsersByIDs: (IDs) => {
      dispatch(getUsersByIDs(IDs));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserList)
);
