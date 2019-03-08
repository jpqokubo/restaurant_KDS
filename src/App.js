import React, { Component } from "react";
import "./App.css";
import store from "./store";
import { logoutUser } from "./actions/authActions";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ResetPassword from "./components/auth/ResetPassword";
import EnterNewPassword from "./components/auth/EnterNewPassword";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import { Provider } from "react-redux";
import OrderDisplay from "./components/square/OrderDisplay";
import Dashboard from "./components/square/dashboard/Dashboard";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/resetpass" component={EnterNewPassword} />
              <Route exact path="/orderdisplay" component={OrderDisplay} />
              <Route exact path="/resetpassword" component={ResetPassword} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
