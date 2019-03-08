import React, { Component } from "react";
import OauthLogin from "../oauth/OauthLogin";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <OauthLogin />
      </div>
    );
  }
}
export default Dashboard;
