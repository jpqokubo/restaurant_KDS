import React, { Component } from "react";
import { connect } from "react-redux";
import { get_average, loader } from "../../../actions/squareActions";
import "date-fns";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import CircularProgress from "@material-ui/core/CircularProgress";
import SimpleTable from "./SimpleTable";
const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
  grid: {
    width: "60%"
  }
});

class AverageTicket extends Component {
  state = {
    selectedBeginDate: "",
    selectedEndDate: new Date()
  };
  componentWillMount() {
    var date = new Date();
    date.setDate(date.getDate() - 7);
    this.setState({ selectedBeginDate: date });
    console.log("hi");
  }
  componentDidMount() {
    const beginDate = this.state.selectedBeginDate;
    const endDate = this.state.selectedEndDate;
    this.props.get_average(beginDate, endDate);
  }
  handleChaneBegin = date => {
    this.setState({ selectedBeginDate: date });
    const endDate = this.state.selectedEndDate;
    this.props.get_average(date, endDate);
    this.props.loader(true);
  };

  handleChaneEnd = date => {
    const beginDate = this.state.selectedBeginDate;
    this.setState({ selectedEndDate: date });
    this.props.get_average(beginDate, date);
    this.props.loader(true);
  };

  render() {
    console.log(this.state);
    const { classes } = this.props;
    const loader = this.props.square.loader;
    console.log(loader);
    const { selectedBeginDate, selectedEndDate } = this.state;
    return (
      <div style={{ alignContent: "left" }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container className={classes.grid} justify="space-around">
            <DatePicker
              margin="normal"
              label="Begin Date"
              value={selectedBeginDate}
              onChange={this.handleChaneBegin}
            />
            <DatePicker
              margin="normal"
              label="End Date"
              value={selectedEndDate}
              onChange={this.handleChaneEnd}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <Grid container>
          {loader ? (
            <ResponsiveContainer width="50%" height={320}>
              <CircularProgress
                className={classes.progress}
                style={{ marginLeft: "50%", marginTop: "20%" }}
              />
            </ResponsiveContainer>
          ) : (
            <LineChart />
          )}
          {loader ? (
            <ResponsiveContainer width="50%" height={320}>
              <CircularProgress
                className={classes.progress}
                style={{ marginLeft: "50%", marginTop: "20%" }}
              />
            </ResponsiveContainer>
          ) : (
            <BarChart />
          )}

          <SimpleTable />
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  square: state.square
});
export default connect(
  mapStateToProps,
  { get_average, loader }
)(withStyles(styles)(AverageTicket));
