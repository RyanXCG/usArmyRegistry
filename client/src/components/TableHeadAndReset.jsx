import { React, Component } from "react";
import { connect } from "react-redux";
import { updatePageInfo } from "../actions/pageAction";

import "../cssFiles/userList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faRedoAlt,
} from "@fortawesome/free-solid-svg-icons";

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
      <div>
        <button id="reset" onClick={() => this.onResetButtonClicked()}>
          <FontAwesomeIcon icon={faRedoAlt} /> Reset
        </button>
        <table className="users">
          <thead>
            <tr>
              <th className="edit">Edit</th>
              <th className="delete">Delete</th>
              <th className="avator">Avator</th>
              <th
                className="clickable name"
                onClick={() => this.onSortButtonClicked("name")}
              >
                Name{" "}
                {this.props.pageInfo.sortMethod === "name" &&
                  (this.props.pageInfo.sortDir === 1 ? (
                    <FontAwesomeIcon icon={faSortUp} />
                  ) : (
                    <FontAwesomeIcon icon={faSortDown} />
                  ))}
              </th>
              <th
                className="clickable sex"
                onClick={() => this.onSortButtonClicked("sex")}
              >
                Sex{" "}
                {this.props.pageInfo.sortMethod === "sex" &&
                  (this.props.pageInfo.sortDir === 1 ? (
                    <FontAwesomeIcon icon={faSortUp} />
                  ) : (
                    <FontAwesomeIcon icon={faSortDown} />
                  ))}
              </th>
              <th
                className="clickable rank"
                onClick={() => this.onSortButtonClicked("rank")}
              >
                Rank{" "}
                {this.props.pageInfo.sortMethod === "rank" &&
                  (this.props.pageInfo.sortDir === 1 ? (
                    <FontAwesomeIcon icon={faSortUp} />
                  ) : (
                    <FontAwesomeIcon icon={faSortDown} />
                  ))}
              </th>
              <th
                className="clickable startDate"
                onClick={() => this.onSortButtonClicked("startDate")}
              >
                StartDate{" "}
                {this.props.pageInfo.sortMethod === "startDate" &&
                  (this.props.pageInfo.sortDir === 1 ? (
                    <FontAwesomeIcon icon={faSortUp} />
                  ) : (
                    <FontAwesomeIcon icon={faSortDown} />
                  ))}
              </th>
              <th
                className="clickable phoneHead"
                onClick={() => this.onSortButtonClicked("phone")}
              >
                Phone{" "}
                {this.props.pageInfo.sortMethod === "phone" &&
                  (this.props.pageInfo.sortDir === 1 ? (
                    <FontAwesomeIcon icon={faSortUp} />
                  ) : (
                    <FontAwesomeIcon icon={faSortDown} />
                  ))}
              </th>
              <th
                className="clickable emailHead"
                onClick={() => this.onSortButtonClicked("email")}
              >
                Email{" "}
                {this.props.pageInfo.sortMethod === "email" &&
                  (this.props.pageInfo.sortDir === 1 ? (
                    <FontAwesomeIcon icon={faSortUp} />
                  ) : (
                    <FontAwesomeIcon icon={faSortDown} />
                  ))}
              </th>
              <th
                className="clickable supName"
                onClick={() => this.onSortButtonClicked("superior")}
              >
                Superior{" "}
                {this.props.pageInfo.sortMethod === "superior" &&
                  (this.props.pageInfo.sortDir === 1 ? (
                    <FontAwesomeIcon icon={faSortUp} />
                  ) : (
                    <FontAwesomeIcon icon={faSortDown} />
                  ))}
              </th>
              <th
                className="clickable numDS"
                onClick={() => this.onSortButtonClicked("numDS")}
              >
                # of D.S.{" "}
                {this.props.pageInfo.sortMethod === "numDS" &&
                  (this.props.pageInfo.sortDir === 1 ? (
                    <FontAwesomeIcon icon={faSortUp} />
                  ) : (
                    <FontAwesomeIcon icon={faSortDown} />
                  ))}
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
