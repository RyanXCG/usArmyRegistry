import { React, Component } from "react";
import { connect } from "react-redux";
import { updatePageInfo } from "../actions/pageAction";

class TableHeadAndReset extends Component {
  onSortButtonClicked = (button) => {
    this.props.updatePageInfo({
      ...this.props.pageInfo,
      sortMethod: button,
      sortDir: this.props.pageInfo.sortDir === 1 ? -1 : 1,
    });
  };

  onResetButtonClicked = () => {
    this.props.updatePageInfo(this.props.pageInfo);
  };

  render() {
    return (
      <div className="TableHeadAndReset">
        <button onClick={() => this.onResetButtonClicked()}>Reset</button>
        <br></br>
        <table>
          <thead>
            <tr>
              <th>Edit</th>
              <th>Delete</th>
              <th>Avator</th>
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
                <button onClick={() => this.onSortButtonClicked("startDate")}>
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
                <button onClick={() => this.onSortButtonClicked("superior")}>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pageInfo: state.pageInfoReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePageInfo: (sortInfo) => {
      dispatch(updatePageInfo(sortInfo));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableHeadAndReset);
