import { combineReducers } from "redux";
import userReducer from "./userReducer";
import pageInfoReducer from "./pageInfoReducers";
const reducers = combineReducers({
  userReducer,
  pageInfoReducer,
});

export default reducers;
