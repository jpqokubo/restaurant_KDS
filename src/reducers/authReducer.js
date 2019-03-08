import { SET_CURRENT_USER, SUCCESS_RESET } from "../actions/types";
import isEmpty from "../validation/is-empty";
const initialState = {
  isAuthenticated: false,
  successEmailReset: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SUCCESS_RESET:
      return {
        ...state,
        successEmailReset: !isEmpty(action.payload)
      };

    default:
      return state;
  }
}
