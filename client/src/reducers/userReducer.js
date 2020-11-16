const initState = { isFetching: false, data: [], err: null };

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "USER_FETCH_START":
      return {
        ...state,
        isFetching: true,
      };
    case "USER_FETCH_FAIL":
      return {
        ...state,
        err: action.err,
        isFetching: false,
      };
    case "USER_FETCH_SUCCESS":
      return {
        ...state,
        isFetching: false,
        err: null,
        data: action.data,
      };
    case "ADD_USER":
      return {
        ...state,
        isFetching: false,
        err: null,
      };
    case "UPDATE_USER":
      return {
        ...state,
        isFetching: false,
        err: null,
      };
    case "DELETE_USER":
      return {
        ...state,
        data: state.data.filter((user) => user._id !== action.payload),
        isFetching: false,
        err: null,
      };
    default:
      return {
        state,
      };
  }
};

export default userReducer;
