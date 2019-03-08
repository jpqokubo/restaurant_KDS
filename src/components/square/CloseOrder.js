import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { delete_order } from "../../actions/squareActions";

class CloseOrder extends Component {
  state = {
    id: this.props.id
  };

  onClick = () => {
    const id = this.state.id;
    axios.post("/api/square/completeOrder", { id: id });
    this.props.delete_order(this.state.id);
  };
  render() {
    return (
      <div>
        {this.state.id}
        <button onClick={this.onClick}>Done</button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  square: state.square
});

export default connect(
  mapStateToProps,
  { delete_order }
)(CloseOrder);
