import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "./Order";
import Categories from "./Categories";
import ItemQuantity from "./ItemQuantity";
import Stopwatch from "../utils/Stopwatch";

class OrderDisplay extends Component {
  onClick = () => {
    // this.props.filter_category(category)
  };

  render() {
    return (
      <div>
        <Categories />
        <ItemQuantity />

        <Order />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  square: state.square
});
export default connect(mapStateToProps)(OrderDisplay);
