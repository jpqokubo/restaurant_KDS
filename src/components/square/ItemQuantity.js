import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid";
import Typography from "@material-ui/core/Typography";
import { order_bycategory } from "../../actions/squareActions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

class ItemQuantity extends Component {
  state = {
    orderByCategory: [],
    orders: []
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.orders !== nextState.orders) {
      return true;
    }
    if (this.state.orderByCategory !== nextProps.bycategory) {
      return true;
    }
    return false;
  }
  componentDidMount() {
    const bycategory = this.props.square.orders_bycategory;
    const orders = this.props.square.orders_byquantity;
    this.setState({ orders: orders });
    this.setState({ orderByCategory: bycategory });
  }
  componentWillReceiveProps() {
    const bycategory = this.props.square.orders_bycategory;
    const orders = this.props.square.orders_byquantity;
    this.setState({ orders: orders });
    this.setState({ orderByCategory: bycategory });
  }

  render() {
    let order_byItems = [];
    let order_byCategory = [];
    let all_orders_quantity = [];
    let orders_quantity_byCategory = [];
    const orderByCategory = this.props.square.orders_bycategory;
    const orders = this.props.square.orders_byquantity;
    orders.map(order =>
      order.itemizations.map(order => order_byItems.push(order))
    );
    orderByCategory.map(order =>
      order.itemizations.map(order => order_byCategory.push(order))
    );

    let item_quantity = order_byItems.reduce(
      (all, { name: n, quantity: a }) => {
        all[n] = (all[n] || 0) + a;
        return all;
      },
      {}
    );

    const item_category = order_byCategory.reduce(
      (all, { name: n, quantity: a }) => {
        all[n] = (all[n] || 0) + a;
        return all;
      },
      {}
    );

    let sortedObject = {};
    Object.keys(item_quantity)
      .sort((a, b) => {
        return item_quantity[b] - item_quantity[a];
      })
      .map(key => (sortedObject[key] = item_quantity[key]));

    console.log(sortedObject);

    for (let prop in sortedObject) {
      if (item_quantity[prop] > this.props.square.item_count) {
        all_orders_quantity.push(
          <li
            style={{ display: "inline", textTransform: "capitalize" }}
            key={uuid()}
          >
            {item_quantity[prop]} - {prop}
          </li>
        );
      }
    }
    let sortedObjectByCategory = {};
    Object.keys(item_category)
      .sort((a, b) => {
        return item_category[b] - item_category[a];
      })
      .map(key => (sortedObjectByCategory[key] = item_category[key]));

    for (let prop in sortedObjectByCategory) {
      if (item_category[prop] > this.props.square.item_count) {
        orders_quantity_byCategory.push(
          <li
            key={uuid()}
            style={{ display: "inline", textTransform: "capitalize" }}
          >
            {item_category[prop]} - {prop}
          </li>
        );
      }
    }
    const selected_category = this.props.square.selected_category;

    return (
      <div style={{ margin: "0.25rem", alignContent: "left" }}>
        {selected_category.length !== 0 ? (
          <ul key={uuid()}>
            <Typography
              variant="body1"
              style={{
                color: "#424242",
                float: "center",
                fontWeight: "bold",
                backgroundColor: "#fafafa",
                margin: "0.4rem",
                borderRadius: "0.8rem",
                padding: "0.4rem"
              }}
            >
              {orders_quantity_byCategory}
            </Typography>
          </ul>
        ) : (
          <ul key={uuid()}>
            <Typography
              variant="body1"
              style={{
                color: "#424242",
                float: "center",
                fontWeight: "bold",
                backgroundColor: "#fafafa",
                margin: "0.4rem",
                borderRadius: "0.8rem",
                padding: "0.4rem"
              }}
            >
              {all_orders_quantity}
            </Typography>
          </ul>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  square: state.square
});
export default connect(
  mapStateToProps,
  { order_bycategory }
)(ItemQuantity);
