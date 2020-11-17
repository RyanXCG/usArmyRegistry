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
    case "PAGEINFO_UPDATE":
      return {
        ...state,
        err: null,
      };
    default:
      return {
        state,
      };
  }
};

export default pageInfoReducer;
