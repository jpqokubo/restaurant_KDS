import React, { Component } from "react";
import axios from "axios";

class OauthLogin extends Component {
  state = {};

  onClickHandle = () => {
    axios.post("api/users/current");
  };

  render() {
    return (
      <div sytle={{ alignContent: "center" }}>
        <a
          onClick={this.onClickHandle}
          className="btn btn-primary"
          href="http://localhost:5000/api/users/oauthlogin"
        >
          Connect with Square
        </a>
      </div>
    );
  }
}
export default OauthLogin;
