import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";

class Stopwatch extends Component {
  componentDidMount() {
    const id = this.props.id;
    const timer = localStorage.getItem(id);
    if (timer === null) {
      localStorage.setItem(id, Date.now());
    }

    this.interval_clock();
  }

  componentDidUpdate() {
    clearTimeout(this.interval_clock);
  }

  handleStart = () => {
    const id = this.props.id;
    const timer = parseInt(localStorage.getItem(id));
    const elapsed = Math.floor((Date.now() - timer) / 1000);
  };
  awaitFunctionClock = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 4000);
    });
  };
  interval_clock = async () => {
    const _await = await this.awaitFunctionClock();

    this.handleStart();

    setTimeout(this.interval_clock, 4000);
  };
  getSeconds = () => {
    const id = this.props.id;
    const timer = parseInt(localStorage.getItem(id));
    return ("0" + (timer % 60)).slice(-2);
  };

  getMinutes = () => {
    const id = this.props.id;
    const timer = parseInt(localStorage.getItem(id));
    const elapsed = Math.floor((Date.now() - timer) / 1000);
    return Math.floor(elapsed / 60);
  };

  render() {
    const mins = this.getMinutes();
    const timer = this.props.square.overdue;
    return (
      <div style={{ float: "right" }} key={this.props.id}>
        <Typography variant="body1">
          {mins > timer ? (
            <p
              style={{
                backgroundColor: "#e57373",
                color: "white",
                margin: "0.2rem",
                borderRadius: "1.5rem",
                padding: "0.25rem"
              }}
            >
              {mins} mins
            </p>
          ) : (
            <p
              style={{
                backgroundColor: "#43a047",
                color: "white",
                margin: "0.2rem",
                borderRadius: "1.5rem",
                padding: "0.25rem"
              }}
            >
              {mins} mins
            </p>
          )}
        </Typography>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  square: state.square
});
export default connect(mapStateToProps)(Stopwatch);
