import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSearch } from "../actions/pageAction";

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
    this.updateSearch = debounce(this.props.updateSearch, 700);
  }

  componentDidMount() {
    this.setState({ search: this.props.pageInfo.search });
  }

  onSearchInputChange = (e) => {
    this.setState({ search: e.target.value });
    this.updateSearch({ ...this.props.pageInfo, search: e.target.value });
  };

  render() {
    return (
      <div>
        <form>
          <label>Search: </label>
          <input
            value={this.state.search}
            onChange={this.onSearchInputChange}
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
    updateSearch: (params) => {
      dispatch(updateSearch(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
