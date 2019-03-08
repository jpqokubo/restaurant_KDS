import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { overdue_timer, item_count } from "../../actions/squareActions";
import TextField from "@material-ui/core/TextField";


class Navbar extends Component {
  state = {
    overdue: 10,
    itemCount: 5
  };
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  onChange = e => {
    const timer = e.target.value;
    this.setState({ overdue: timer });
    this.props.overdue_timer(timer);
  };

  onChageItemCount = e => {
    const counter = e.target.value;
    this.setState({ itemCount: counter });
    this.props.item_count(counter);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            href=""
            className="nav-link"
            onClick={this.onLogoutClick.bind(this)}
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
            />
            Logout{" "}
          </a>
        </li>
      </ul>
    );
    const guesLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="./register" className="nav-link">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Express Flow
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/orderdisplay">
                  Kitchen Display
                </Link>
              </li>
              <TextField
                id="filled-dense"
                margin="dense"
                label="Overdue Timer"
                placeholder="mins"
                variant="filled"
                value={this.state.overdue}
                onChange={this.onChange}
              />
              <TextField
                id="filled-dense"
                margin="dense"
                label="Item Counter"
                variant="filled"
                value={this.state.itemCount}
                onChange={this.onChageItemCount}
              />
            </ul>
            {isAuthenticated ? authLinks : guesLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const MapStateToProps = state => ({
  auth: state.auth
});
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
export default connect(
  MapStateToProps,
  { logoutUser, overdue_timer, item_count }
)(Navbar);
