import userReducer from "./userReducer";

const initState = {
  search: "",
  page: 1,
  sortMethod: "name",
  sortDir: 1,
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
    default:
      return state;
  }
};

export default pageInfoReducer;
