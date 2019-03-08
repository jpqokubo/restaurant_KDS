import axios from "axios";
import {
  GET_TRANSACTIONS,
  GET_ERRORS,
  GET_COMPLETED_TRANS,
  DELETE_ORDER,
  ORDER_BYCATEGORY,
  GET_CATEGORIES,
  SELECTED_CATEGORY,
  DONE_ORDER,
  ORDERS_BYQUANTITY,
  OVERDUE_TIMER,
  ITEM_COUNT
} from "./types";
import uuid from "uuid";

export const getTransactions = () => dispatch => {
  axios
    .get("/api/square/orderslist")
    .then(res => {
      const newOrder = res.data.data;

      return axios.get("/api/square/getcompletedtrans").then(response => {
        const checkForPending = response.data.data;

        if (checkForPending) {
          const orderCompleted = checkForPending.filter(order => {
            return !order.completed;
          });
          const orders = orderCompleted.map(order => order.transactionId);

          const items = newOrder.filter(order => {
            if (orders.indexOf(order.id) === -1) {
              return false;
            }
            return true;
          });

          dispatch({
            type: GET_TRANSACTIONS,
            payload: items
          });
        }
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const getCompletedTransactions = () => dispatch => {
  axios
    .get("/api/square/getcompletedtrans")
    .then(res => {
      dispatch({
        type: GET_COMPLETED_TRANS,
        payload: res.data.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const delete_order = id => dispatch => {
  dispatch({
    type: DELETE_ORDER,
    payload: id
  });
};
export const done_order = id => dispatch => {
  dispatch({
    type: DONE_ORDER,
    payload: id
  });
};
export const order_bycategory = (selectedOption, items) => dispatch => {
  let orderList = [];
  let selectedCategory;
  if (selectedOption) {
    selectedCategory = selectedOption.map(category => category.value);

    if (items[0] !== undefined) {
      items.map(items => {
        return items.itemizations.filter((element, i) => {
          if (
            selectedCategory.indexOf(element.item_detail.category_name) !== -1
          ) {
            orderList.push({
              id: items.id,
              orderItemid: uuid(),
              category: element.item_detail.category_name,
              itemizations: [element],
              tender: [items.tender]
            });
          }
          return false;
        });
      });
    }

    for (
      let i = 0, j = 1;
      i < orderList.length, j < orderList.length;
      i++, j++
    ) {
      if (
        orderList[i].id === orderList[j].id &&
        orderList[i].category === orderList[j].category
      ) {
        let order = {
          id: orderList[i].id,
          orderItemid: uuid(),
          category: orderList[i].category,
          itemizations: [
            orderList[i].itemizations[0],
            orderList[j].itemizations[0]
          ],
          tender: orderList[i].tender
        };
        orderList.splice(i, 2, order);
      }
    }
  }
  dispatch({
    type: ORDER_BYCATEGORY,
    payload: orderList
  });
};

export const get_categories = () => dispatch => {
  axios.get("/api/square/getCategories").then(res => {
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  });
};

export const filter_category = category => dispatch => {
  dispatch({
    type: SELECTED_CATEGORY,
    payload: category
  });
};
export const orders_byquantity = orders => dispatch => {
  dispatch({
    type: ORDERS_BYQUANTITY,
    payload: orders
  });
};
export const overdue_timer = overdue => dispatch => {
  dispatch({
    type: OVERDUE_TIMER,
    payload: overdue
  });
};
export const item_count = item => dispatch => {
  dispatch({
    type: ITEM_COUNT,
    payload: item
  });
};
