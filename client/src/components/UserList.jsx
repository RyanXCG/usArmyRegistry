import { React, Component } from "react";
import { getUsers, deleteUser } from "../actions/userActions";
import { addPage, getCount } from "../actions/pageAction";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { withRouter } from "react-router";
class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
    };
  }

  componentDidMount() {
    this.props.getUsers(this.props.pageInfo);
    // get the total number of document
    this.props.getCount(this.props.pageInfo.search);
  }

  onDeleteClicked(id) {
    this.props.deleteUser(id);
  }

  onEditClicked(user) {
    this.props.history.push(`/editUser/${user._id}`);
  }

  // infinite scroll functions
  fetchMoreData = () => {
    console.log("(this.props.users.data.length", this.props.users.data.length);
    if (this.props.users.data.length >= this.props.pageInfo.count) {
      this.setState({ hasMore: false });
      return;
    }

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
        console.log(data.length);
        return (
          <div className="UserList">
            <InfiniteScroll
              dataLength={this.props.users.data.length}
              next={this.fetchMoreData}
              hasMore={this.state.hasMore}
              loader={<h4>Loading...</h4>}
              height={200}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <table>
                <tbody style={{ height: 300, overflow: "auto" }}>
                  {data.map((user) => {
                    return (
                      <tr key={user._id}>
                        <td>
                          <button onClick={() => this.onEditClicked(user)}>
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => this.onDeleteClicked(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <img
                            src={`data:image/png;base64,${user.avator.data}`}
                            width="50"
                          />
                        </td>
                        <td>{user.name}</td>
                        <td>{user.sex}</td>
                        <td>{user.rank}</td>
                        <td>{user.startDate}</td>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.supName.length !== 0 && user.supName[0].name}
                        </td>
                        <td>{user.subs.length}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </InfiniteScroll>
          </div>
        );
      }
    }
  }
}

/*

*/

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
    deleteUser: (id) => {
      dispatch(deleteUser(id));
    },
    addPage: () => {
      dispatch(addPage());
    },
    getCount: (search) => {
      dispatch(getCount(search));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserList)
);
