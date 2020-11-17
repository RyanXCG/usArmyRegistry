import { React, Component } from "react";
import { getUsers, deleteUser } from "../actions/userActions";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
    };
    //this.getUsers = debounce(this.props.getUsers, 500);
  }

  componentDidMount() {
    console.log("pageInfo", this.props.pageInfo);
    //console.log("pageInfo", this.props.users);
    this.props.getUsers(this.props.pageInfo.state);
  }

  onSortButtonClicked = (button) => {
    /*
    this.setState({
      page: 1,
      sortMethod: button,
      sortDir: this.state.sortDir === 1 ? -1 : 1,
    });
    this.getUsers({
      ...this.state,
      page: 1,
      sortMethod: button,
      sortDir: this.state.sortDir === 1 ? -1 : 1,
    });
    */
  };

  onDeleteClicked(id) {
    //this.props.deleteUser(id);
  }

  onEditClicked(user) {
    /*
    this.props.history.push(
      `/${user._id}/${user.firstName}/${user.lastName}/${user.sex}/${user.age}`
    );
    */
  }

  // infinite scroll functions
  fetchMoreData = () => {
    if (this.props.users.data.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    this.props.getUsers({
      ...this.props.pageInfo,
      page: this.props.pageInfo.page + 1,
    });
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
            <table>
              <thead>
                <tr>
                  <th>Edit</th>
                  <th>Delete</th>
                  <th>
                    <button>Avator</button>
                  </th>
                  <th>
                    <button onClick={() => this.onSortButtonClicked("name")}>
                      Name
                    </button>
                  </th>
                  <th>
                    <button onClick={() => this.onSortButtonClicked("sex")}>
                      Sex
                    </button>
                  </th>
                  <th>
                    <button onClick={() => this.onSortButtonClicked("rank")}>
                      Rank
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => this.onSortButtonClicked("startDate")}
                    >
                      StartDate
                    </button>
                  </th>
                  <th>
                    <button onClick={() => this.onSortButtonClicked("phone")}>
                      Phone
                    </button>
                  </th>
                  <th>
                    <button onClick={() => this.onSortButtonClicked("email")}>
                      Email
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => this.onSortButtonClicked("superior")}
                    >
                      Superior
                    </button>
                  </th>
                  <th>
                    <button onClick={() => this.onSortButtonClicked("numDS")}>
                      # of D.S.
                    </button>
                  </th>
                </tr>
              </thead>
            </table>

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
                    let pic = btoa(
                      String.fromCharCode.apply(null, user.avator.data.data)
                    );

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
                            src={`data:image/png;base64,${pic}`}
                            width="50"
                          />
                        </td>
                        <td>{user.name}</td>
                        <td>{user.sex}</td>
                        <td>{user.rank}</td>
                        <td>{user.startDate}</td>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                        <td>{user.superior}</td>
                        <td>{user.numDS}</td>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
