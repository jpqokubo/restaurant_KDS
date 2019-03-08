import { combineReducers } from "redux";
import squareReducer from "./squareReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  square: squareReducer,
  auth: authReducer,
  errors: errorReducer
});
