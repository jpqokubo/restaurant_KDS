import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { enterresetpass } from "../../actions/authActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
class EnterNewPassword extends Component {
  state = {
    password: "",
    password2: "",
    errors: {},
    token: "",
    success: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.auth.successEmailReset) {
      this.setState({ success: true });
    }
  }

  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const token = params.get("exp");
    this.setState({ token: token });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    const resetData = {
      password: this.state.password,
      password2: this.state.password2,
      resetPassLink: this.state.token
    };
    this.props.enterresetpass(resetData);
    e.preventDefault();
  };

  render() {
    const { errors } = this.state;
    if (this.state.success) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Password reset completed
              </h1>
              <p className="lead text-center">
                Please click here to{" "}
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Reset password</h1>
              <p className="lead text-center">
                Please enter a new password (6 characters minimum)
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    value={this.state.password}
                    type="password"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    value={this.state.password2}
                    type="password"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

EnterNewPassword.PropTypes = {
  enterresetpass: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
export default connect(
  mapStateToProps,
  { enterresetpass }
)(EnterNewPassword);
