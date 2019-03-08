import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import { resetPass } from "../../actions/authActions";

class ResetPassword extends Component {
  state = {
    email: "",
    success: false,
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.auth.successEmailReset) {
      this.setState({ success: true });
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const email = {
      email: this.state.email
    };
    this.props.resetPass(email);
  };

  render() {
    const { errors } = this.state;
    if (this.state.success) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Email sent</h1>
              <p className="lead text-center">
                An email has been sent to the address you provided containing a
                link to reset your password. Please click that link to proceed
                with setting a new password.
              </p>
              {/* <p>
              <a href="/account/reset-password" onClick={this.clearPasswordReset}>Re-send Email</a>
            </p> */}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Reset your password</h1>
                <p className="lead text-center">
                  If you‘d like to reset your password, please enter your email
                  here and a link to do so will be sent to the address you
                  enter.
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      value={this.state.email}
                      onChange={this.onChange}
                      type="email"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.email
                      })}
                      placeholder="Email Address"
                      name="email"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
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
ResetPassword.propTypes = {
  resetPass: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { resetPass }
)(ResetPassword);
