import React, { Component } from "react";
import axios from "axios";
import * as jsonpatch from "fast-json-patch";
import _ from "lodash";
import uuid from "uuid";
import { connect } from "react-redux";
import Stopwatch from "../utils/Stopwatch";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import {
  getTransactions,
  getCompletedTransactions,
  delete_order,
  done_order,
  order_bycategory,
  orders_byquantity
} from "../../actions/squareActions";
const styles = {
  card: {
    minWidth: 275
  }
};
class Order extends Component {
  state = {
    items: [],
    completed: [],
    employee_info: [],
    category: [],
    order_bycategory: [],
    load_category: false
  };

  componentDidMount() {
    this.interval();
    this.getData();
    this.getEmployeeInterval();
  }
  componentWillReceiveProps() {
    this.setState({
      order_bycategory: this.props.square.orders_bycategory
    });
  }
  componentDidUpdate() {
    clearTimeout(this.interval);
    clearTimeout(this.getEmployeeInterval);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.items !== nextState.items) {
      return true;
    }

    if (this.state.order_bycategory !== nextProps.orders_bycategory) {
      return true;
    }
    return false;
  }
  getEmployees = async () => {
    const response = await axios.get("/api/square/getemployee");
    const employee_data = response.data;
    const diffEmployees = jsonpatch.compare(
      employee_data,
      this.state.employee_info
    );
    if (diffEmployees.length !== 0) {
      this.setState({
        employee_info: employee_data
      });
    }
  };

  getData = async () => {
    await this.props.getTransactions();
    const diffOrders = jsonpatch.compare(
      this.state.items,
      this.props.square.items
    );
    console.log(this.props.square.items);

    if (diffOrders.length !== 0 && diffOrders[0].op !== "remove") {
      if (diffOrders[0].op === "add") {
        this.setState({
          items: this.props.square.items
        });
        this.props.order_bycategory(
          this.props.square.selected_category,
          this.props.square.items
        );
        this.props.orders_byquantity(this.state.items);
      }
    }
  };

  onClick = async id => {
    //const id = e.target.value;
    localStorage.removeItem(id);
    this.props.delete_order(id);
    await this.setState({
      items: this.state.items.filter(item => item.id !== id)
    });
    this.props.orders_byquantity(this.state.items);
    axios.post("/api/square/completeOrder", { id: id });
  };
  awaitFunction = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 4000);
    });
  };
  awaitFunc = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
  };
  interval = async () => {
    const _await = await this.awaitFunction();
    this.getData();
    setTimeout(this.interval, 3500);
  };

  getEmployeeInterval = async () => {
    const _await = await this.awaitFunc();
    this.getEmployees();
    setTimeout(this.interval, 60000);
  };

  orderList = orderList => {
    this.setState({ items: orderList });
  };

  render() {
    const selected_category = this.props.square.selected_category;
    const category = this.props.square.orders_bycategory;
    const onClick = id => {
      this.onClick(id);
    };
    const handledone = id => {
      this.props.done_order(id);
    };
    return (
      <Grid container spacing={16} style={{ flexGrow: 1, margin: "0.2rem" }}>
        {selected_category.length !== 0
          ? category.map((item, i) => (
              <Card
                style={{ width: "16rem", flexGrow: 1, margin: "0.2rem" }}
                key={uuid()}
              >
                <CardContent>
                  <Stopwatch id={item.id} />
                  <Typography variant="button">
                    <p>Order# {item.id.slice(0, 5)}</p>
                  </Typography>

                  <Button
                    fullWidth={true}
                    variant="outlined"
                    size="small"
                    color="primary"
                    value={item.id}
                    onClick={() => handledone(item.orderItemid)}
                  >
                    Done
                  </Button>

                  <div key={uuid()} className="card-body">
                    {item.tender.map((i, index) =>
                      this.state.employee_info.map(employee => (
                        <div key={uuid()} className="card-subtitle mb-2">
                          {i[index].employee_id === employee.id ? (
                            <Typography variant="body1" key={employee.id}>
                              Staff: {employee.first_name}{" "}
                              {employee.last_name.slice(0, 1)}.
                            </Typography>
                          ) : null}
                        </div>
                      ))
                    )}

                    {item.itemizations.map(name => (
                      <span key={uuid()}>
                        {name.name === "PICK-UP" ? (
                          <Typography key={uuid()}>{name.name}</Typography>
                        ) : null}
                        {name.name === "DELIVERY" ? (
                          <Typography key={uuid()}>{name.name}</Typography>
                        ) : null}
                        {name.notes ? (
                          name.notes.includes("pickup") ||
                          name.notes.includes("Pickup") ? (
                            <Typography
                              style={{ color: "#1e88e5", fontWeight: "bold" }}
                            >
                              PICK-UP
                            </Typography>
                          ) : null
                        ) : null}
                        {name.notes ? (
                          name.notes.includes("Delivery") ||
                          name.notes.includes("delivery") ? (
                            <Typography
                              style={{ color: "#1e88e5", fontWeight: "bold" }}
                            >
                              DELIVERY
                            </Typography>
                          ) : null
                        ) : null}
                        {name.notes ? (
                          name.notes.includes("Togo") ||
                          name.notes.includes("to-go") ||
                          name.notes.includes("To-go") ||
                          name.notes.includes("togo") ? (
                            <Typography
                              style={{ color: "#1e88e5", fontWeight: "bold" }}
                            >
                              TO-GO
                            </Typography>
                          ) : null
                        ) : null}
                      </span>
                    ))}

                    {item.itemizations.map(item => (
                      <div key={uuid()} className="card-text">
                        {item.name !== "PICK-UP" && item.name !== "DELIVERY" ? (
                          <Typography
                            variant="subtitle2"
                            style={{
                              margin: "0.2rem",
                              textTransform: "capitalize"
                            }}
                            key={uuid()}
                          >
                            {item.quantity} {item.name}
                          </Typography>
                        ) : null}
                        {item.modifiers.map(i => (
                          <Typography
                            variant="body1"
                            align="justify"
                            style={{
                              backgroundColor: "#fafafa",
                              margin: "0.2rem",
                              borderRadius: "0.5rem",
                              padding: "0.25rem"
                            }}
                            key={uuid()}
                          >
                            {i.name}
                          </Typography>
                        ))}
                        {!item.notes ? null : (
                          <Typography
                            style={{
                              backgroundColor: "#e8f5e9",

                              margin: "0.2rem",
                              borderRadius: "0.5rem",
                              padding: "0.25rem"
                            }}
                            key={uuid()}
                          >
                            {item.notes}
                          </Typography>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* </div> */}
                </CardContent>
              </Card>
            ))
          : this.state.items.map(item => (
              <Card
                style={{ width: "16rem", flexGrow: 1, margin: "0.2rem" }}
                key={uuid()}
              >
                <CardContent>
                  <Stopwatch id={item.id} />
                  <Typography variant="button">
                    <p>Order# {item.id.slice(0, 5)}</p>
                  </Typography>

                  <Button
                    fullWidth={true}
                    variant="outlined"
                    size="small"
                    color="primary"
                    value={item.id}
                    onClick={() => onClick(item.id)}
                  >
                    Done
                  </Button>

                  <div key={uuid()} className="card-body">
                    {item.tender.map(i =>
                      this.state.employee_info.map(employee => (
                        <div key={uuid()} className="card-subtitle mb-2">
                          {i.employee_id === employee.id ? (
                            <Typography variant="body1" key={employee.id}>
                              Staff: {employee.first_name}{" "}
                              {employee.last_name.slice(0, 1)}.
                            </Typography>
                          ) : null}
                        </div>
                      ))
                    )}

                    {item.itemizations.map(name => (
                      <span key={uuid()}>
                        {name.name === "PICK-UP" ? (
                          <Typography key={uuid()}>{name.name}</Typography>
                        ) : null}
                        {name.name === "DELIVERY" ? (
                          <Typography key={uuid()}>{name.name}</Typography>
                        ) : null}
                        {name.notes ? (
                          name.notes.includes("pickup") ||
                          name.notes.includes("Pickup") ? (
                            <Typography
                              style={{ color: "#1e88e5", fontWeight: "bold" }}
                            >
                              PICK-UP
                            </Typography>
                          ) : null
                        ) : null}
                        {name.notes ? (
                          name.notes.includes("Delivery") ||
                          name.notes.includes("delivery") ? (
                            <Typography
                              style={{ color: "#1e88e5", fontWeight: "bold" }}
                            >
                              DELIVERY
                            </Typography>
                          ) : null
                        ) : null}
                        {name.notes ? (
                          name.notes.includes("Togo") ||
                          name.notes.includes("to-go") ||
                          name.notes.includes("To-go") ||
                          name.notes.includes("togo") ? (
                            <Typography
                              style={{ color: "#1e88e5", fontWeight: "bold" }}
                            >
                              TO-GO
                            </Typography>
                          ) : null
                        ) : null}
                      </span>
                    ))}

                    {item.itemizations.map(item => (
                      <div key={uuid()} className="card-text">
                        {item.name !== "PICK-UP" && item.name !== "DELIVERY" ? (
                          <Typography
                            variant="subtitle2"
                            style={{
                              margin: "0.25rem",
                              textTransform: "capitalize"
                            }}
                            key={uuid()}
                          >
                            {item.quantity} {item.name}
                          </Typography>
                        ) : null}
                        {item.modifiers.map(i => (
                          <Typography
                            variant="body1"
                            align="justify"
                            style={{
                              backgroundColor: "#fafafa",
                              margin: "0.2rem",
                              borderRadius: "0.5rem",
                              padding: "0.25rem"
                            }}
                            key={uuid()}
                          >
                            {i.name}
                          </Typography>
                        ))}
                        {!item.notes ? null : (
                          <Typography
                            style={{
                              backgroundColor: "#e8f5e9",

                              margin: "0.2rem",
                              borderRadius: "0.5rem",
                              padding: "0.25rem"
                            }}
                            key={uuid()}
                          >
                            {item.notes}
                          </Typography>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* </div> */}
                </CardContent>
              </Card>
            ))}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  square: state.square
});
export default connect(
  mapStateToProps,
  {
    getTransactions,
    getCompletedTransactions,
    done_order,
    delete_order,
    order_bycategory,
    orders_byquantity
  }
)(Order);
