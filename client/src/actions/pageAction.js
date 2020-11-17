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

function getCountSuccess(count) {
  return {
    type: "GET_COUNT_SUCCESS",
    payload: count,
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

export const getCount = (search) => {
  return (dispatch, store) => {
    axios
      .get(`/api/count?search=${search}`)
      .then((res) => {
        console.log(res);
        dispatch(getCountSuccess(res.data[0].count));
      })
      .catch((err) => {
        console.log("get count fail");
      });
  };
};

/*
  return {
    type: "UPDATE_SEARCH",
    payload: search,
  };
  */
