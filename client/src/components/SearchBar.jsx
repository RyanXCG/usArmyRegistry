import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePageInfo } from "../actions/pageAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const debounce = (cb, time) => {
  let ref;
  return (arg) => {
    clearTimeout(ref);
    ref = setTimeout(() => {
      cb(arg);
    }, time);
  };
};

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
    this.updatePageInfo = debounce(this.props.updatePageInfo, 700);
  }

  componentDidMount() {
    this.setState({ search: this.props.pageInfo.search });
  }

  onSearchInputChange = (e) => {
    this.setState({ search: e.target.value });
    this.updatePageInfo({ ...this.props.pageInfo, search: e.target.value });
  };

  render() {
    return (
      <div>
        <form>
          <label>
            <FontAwesomeIcon icon={faSearch} />{" "}
          </label>
          <input
            value={this.state.search}
            onChange={this.onSearchInputChange}
            placeholder="Search"
          ></input>
        </form>
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
    updatePageInfo: (params) => {
      dispatch(updatePageInfo(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
