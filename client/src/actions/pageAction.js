import axios from "axios";
import { requestStart, requestFail, requestSuccess } from "./userActions";
export const addPage = () => {
  return {
    type: "ADD_PAGE",
  };
};

function updatePageInfoSuccess(pageInfo) {
  return {
    type: "UPDATE_PAGEINFO_SUCCESS",
    payload: pageInfo,
  };
}

export const updatePageInfo = (params) => {
  const { page, search, sortMethod, sortDir } = params;
  return (dispatch, store) => {
    dispatch(requestStart());
    axios
      .get(
        `/api/users?page=${page}&search=${search}&sortMethod=${sortMethod}&sortDir=${sortDir}`
      )
      .then((res) => {
        dispatch(requestSuccess(res.data));
        dispatch(updatePageInfoSuccess(params));
      })
      .catch((err) => {
        console.log("fail");
        dispatch(requestFail(err));
      });
  };
};
