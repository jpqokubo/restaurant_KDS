import React, { Component } from "react";
import axios from "axios";
import apilink from "../../DevOnly";

class BizProfileHeader extends Component {
  state = {};
  async componentDidMount() {
    const res = await axios.get(`${apilink}/api/square/bizprofile`);
    const profile = res.data.profile;
    this.setState({
      business_id: profile.id,
      name: profile.name,
      business_name: profile.business_name,
      address: profile.address.address_line_1,
      city: profile.address.locality,
      state: profile.address.administrative_district_level_1,
      postal_code: profile.address.postal_code,
      phone_number: profile.phone_number,
      website_url_: process.website_url
    });
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <a href="/" className="navbar-brand" style={{ color: "white" }}>
            {" "}
            {this.state.business_name}
          </a>

          <div>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">Store id: {this.state.business_id}</li>
              <li className="nav-item">
                {" "}
                <i className="fas fa-home" sytle={{ margin: "right" }}>
                  {" "}
                  {this.state.address} {this.state.city} {this.state.state}
                </i>{" "}
              </li>
              <li className="nav-item">
                {" "}
                <i className="fas fa-phone"> {this.state.phone_number}</i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default BizProfileHeader;
