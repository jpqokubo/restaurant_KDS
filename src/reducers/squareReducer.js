import {
  GET_TRANSACTIONS,
  GET_COMPLETED_TRANS,
  GET_NEW_ORDERS,
  DELETE_ORDER,
  GET_CATEGORIES,
  SELECTED_CATEGORY,
  ORDER_BYCATEGORY,
  DONE_ORDER,
  ORDERS_BYQUANTITY,
  OVERDUE_TIMER,
  ITEM_COUNT,
  GET_AVERAGE,
  LOADER
} from "../actions/types";

const initialState = {
  items: [],
  completed: [],
  orders_bycategory: [],
  categories: [],
  selected_category: "",
  orders_byquantity: [],
  overdue: 10,
  item_count: 5,
  transaction_data: "",
  loader: false
};

const squareReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        items: action.payload
      };
    case GET_COMPLETED_TRANS:
      return {
        ...state,
        completed: action.payload
      };
    case GET_NEW_ORDERS:
      return {
        ...state,
        items: action.payload
      };
    case DELETE_ORDER:
      const id = action.payload;

      return {
        ...state,
        items: state.items.filter(item => item.id !== id)
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case ORDER_BYCATEGORY:
      return {
        ...state,
        orders_bycategory: action.payload
      };
    case DONE_ORDER:
      const orderID = action.payload;

      return {
        ...state,
        orders_bycategory: state.orders_bycategory.filter(
          item => item.orderItemid !== orderID
        )
      };
    case SELECTED_CATEGORY:
      return {
        ...state,
        selected_category: action.payload
      };
    case ORDERS_BYQUANTITY:
      return {
        ...state,
        orders_byquantity: action.payload
      };
    case OVERDUE_TIMER:
      return {
        ...state,
        overdue: action.payload
      };
    case ITEM_COUNT:
      return {
        ...state,
        item_count: action.payload
      };
    case GET_AVERAGE:
      return {
        ...state,
        transaction_data: action.payload,
        loader: false
      };
    case LOADER:
      console.log(action.payload);
      return {
        ...state,
        loader: action.payload
      };
    default:
      return state;
  }
};

export default squareReducer;
