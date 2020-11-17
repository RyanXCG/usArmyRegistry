import userReducer from "./userReducer";

const initState = {
  search: "",
  page: 1,
  sortMethod: "name",
  sortDir: 1,
  count: 0,
  err: null,
};

const pageInfoReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_PAGE":
      return {
        ...state,
        page: state.page + 1,
        err: null,
      };
    case "UPDATE_SEARCH_SUCCESS":
      return {
        ...state,
        search: action.payload,
        err: null,
      };
    case "GET_COUNT_SUCCESS":
      console.log("paload", action.payload);
      return {
        ...state,
        count: action.payload,
        err: null,
      };

    default:
      return state;
  }
};

export default pageInfoReducer;
