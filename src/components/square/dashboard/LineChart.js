import React, { Component } from "react";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import LineChart from "recharts/lib/chart/LineChart";
import Line from "recharts/lib/cartesian/Line";
import XAxis from "recharts/lib/cartesian/XAxis";
import YAxis from "recharts/lib/cartesian/YAxis";
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import Tooltip from "recharts/lib/component/Tooltip";
import Legend from "recharts/lib/component/Legend";
import { connect } from "react-redux";
import { loader } from "../../../actions/squareActions";
import { withStyles } from "@material-ui/core/styles";

import _ from "lodash";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
  grid: {
    width: "60%"
  }
});
class SimpleLineChart extends Component {
  state = {
    union: ""
  };

  render() {
    const data_ = this.props.square.transaction_data;

    var value = _.chain(data_)
      .groupBy("date")
      .map(function(i, date) {
        return i.map(item => {
          let sum_total = _.sumBy(item.el, "net_sales_money[amount]");
          return {
            date: date,
            Orders: item.el.length,
            Total: parseFloat(sum_total / 100.0).toFixed(2),
            Average: parseFloat(sum_total / item.el.length / 100.0).toFixed(2)
          };
        });
      })
      .value();
    var union = [];
    for (let i = 0; i < value.length; ++i) {
      let current = value[i];
      for (var j = 0; j < current.length; ++j) union.push(current[j]);
    }
    console.log(union);

    return (
      // 99% per https://github.com/recharts/recharts/issues/172

      <ResponsiveContainer width="50%" height={320}>
        <LineChart data={union} title="Average Ticket Price">
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          {/* <Line
            type="monotone"
            hidden="true"
            dataKey="Total"
            name="Total Orders"
            stroke="#82ca9d"
          /> */}
          <Line
            type="monotone"
            dataKey="Average"
            name="Average Ticket $"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  square: state.square
});
export default connect(
  mapStateToProps,
  { loader }
)(withStyles(styles)(SimpleLineChart));
