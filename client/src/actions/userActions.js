import axios from "axios";
import { updatePageInfo } from "./pageAction";
export const requestStart = () => {
  console.log("started");
  return {
    type: "USER_FETCH_START",
  };
};

export const requestFail = (err) => {
  return {
    type: "USER_FETCH_FAIL",
    err,
  };
};
export const requestSuccess = (data) => {
  console.log("success");
  return {
    type: "USER_FETCH_SUCCESS",
    data,
  };
};

function postSuccess() {
  console.log("post sucess");
  return {
    type: "ADD_USER",
  };
}

function putSuccess() {
  console.log("put sucess");
  return {
    type: "UPDATE_USER",
  };
}

function deleteSuccess(id) {
  console.log("delete sucess");
  return {
    type: "DELETE_USER",
    payload: id,
  };
}

export const getUsers = (params) => {
  const { page, search, sortMethod, sortDir } = params;
  return (dispatch, store) => {
    dispatch(requestStart());
    axios
      .get(
        `/api/users?page=${page}&search=${search}&sortMethod=${sortMethod}&sortDir=${sortDir}`
      )
      .then((res) => {
        dispatch(requestSuccess(res.data));
      })
      .catch((err) => {
        console.log("fail");
        dispatch(requestFail(err));
      });
  };
};

// IDs is a array of ids (string)
export const getUsersByIDs = (IDsarr) => {
  console.log(IDsarr);
  return (dispatch, store) => {
    dispatch(requestStart());
    axios
      .post(`/api/usersByIDs`, { IDs: IDsarr })
      .then((res) => {
        dispatch(requestSuccess(res.data));
      })
      .catch((err) => {
        console.log("fail");
        dispatch(requestFail(err));
      });
  };
};

export const getCount = (search) => {
  return (dispatch, store) => {
    dispatch(requestStart());
    axios
      .get(`/api/count?search=${search}`)
      .then((res) => {
        dispatch(requestSuccess(res.data));
      })
      .catch((err) => {
        console.log("fail");
        dispatch(requestFail(err));
      });
  };
};

export const addUser = (input) => {
  return (dispatch, store) => {
    dispatch(requestStart());
    let formData = new FormData();
    formData.append("image", input.avatorInput);
    formData.set("name", input.nameInput);
    formData.set("rank", input.rankInput);
    formData.set("sex", input.sexInput);
    formData.set("startDate", input.startDateInput);
    formData.set("phone", input.phoneInput);
    formData.set("email", input.emailInput);
    formData.set("supID", input.supID);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("/api/", formData, config)
      .then((res) => {
        dispatch(postSuccess());
        input.history.push("/");
      })
      .catch((err) => {
        dispatch(requestFail(err));
      });
  };
};

export const updateUser = (input) => {
  return (dispatch, store) => {
    dispatch(requestStart());
    let formData = new FormData();
    formData.append("image", input.avatorInput);
    formData.set("name", input.nameInput);
    formData.set("rank", input.rankInput);
    formData.set("sex", input.sexInput);
    formData.set("startDate", input.startDateInput);
    formData.set("phone", input.phoneInput);
    formData.set("email", input.emailInput);
    formData.set("supID", input.supID);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .put(`/api/users/${input.id}`, formData, config)
      .then((res) => {
        dispatch(putSuccess());
        input.history.push("/");
      })
      .catch((err) => {
        dispatch(requestFail(err));
      });
  };
};

export const deleteUser = (id, supID, pageInfo) => {
  return (dispatch, store) => {
    dispatch(requestStart());
    axios
      .delete(`/api/${id}?supID=${supID}`)
      .then((res) => {
        //dispatch(deleteSuccess(id));
        dispatch(updatePageInfo(pageInfo));
      })
      .catch((err) => {
        dispatch(requestFail(err));
      });
  };
};
