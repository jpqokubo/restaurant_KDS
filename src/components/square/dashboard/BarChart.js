import React, { Component } from "react";
import XAxis from "recharts/lib/cartesian/XAxis";
import YAxis from "recharts/lib/cartesian/YAxis";
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import Tooltip from "recharts/lib/component/Tooltip";
import Legend from "recharts/lib/component/Legend";
import Bar from "recharts/lib/cartesian/Bar";
import BarChart from "recharts/lib/chart/BarChart";
import { connect } from "react-redux";
import _ from "lodash";

class BarChart_ extends Component {
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
      <div>
        <BarChart width={560} height={320} data={union}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Total" name="Daily Sales $" fill="#8884d8" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  square: state.square
});
export default connect(mapStateToProps)(BarChart_);
