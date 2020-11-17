import axios from "axios";
import { requestStart, requestFail, requestSuccess } from "./userActions";
export const addPage = () => {
  return {
    type: "ADD_PAGE",
  };
};

function updateSearchSuccess(search) {
  return {
    type: "UPDATE_SEARCH_SUCCESS",
    payload: search,
  };
}

export const updateSearch = (params) => {
  const { page, search, sortMethod, sortDir } = params;
  return (dispatch, store) => {
    dispatch(requestStart());
    axios
      .get(
        `/api/users?page=${page}&search=${search}&sortMethod=${sortMethod}&sortDir=${sortDir}`
      )
      .then((res) => {
        dispatch(requestSuccess(res.data));
        dispatch(updateSearchSuccess(search));
      })
      .catch((err) => {
        console.log("fail");
        dispatch(requestFail(err));
      });
  };
};

/*
  return {
    type: "UPDATE_SEARCH",
    payload: search,
  };
  */
