import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import _ from "lodash";
const styles = {
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
};

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData("Frozen yoghurt", 1, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];
var result = {
  features: _(data.features)
    // get all routes (get rid of properties key)
    .map("properties")
    // group by route_id
    .groupBy("route_id")
    // place properties key again
    .map(function(group) {
      return { properties: group };
    })
    // get grouped features
    .value()
};
function SimpleTable(props) {
  const { classes } = props;
  const data_ = props.square.transaction_data;
  console.log(data_);
  var result = {
    features: _(data_.el)
      // get all routes (get rid of properties key)
      .map(function(el) {
        return el.itemizations.map(i => {
          _.groupBy(i.item_detail.item_id);
        });
      })
      // group by route_id

      // place properties key again
      // .map(function(group) {
      //   return { itemizations: group };
      // })
      // get grouped features
      .value()
  };
  console.log(result);
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Average Ticket</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Modifiers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => (
            <TableRow key={n.id}>
              <TableCell component="th" scope="row">
                {n.name}
              </TableCell>
              <TableCell align="right">{n.calories}</TableCell>
              <TableCell align="right">{n.fat}</TableCell>
              <TableCell align="right">{n.carbs}</TableCell>
              <TableCell align="right">{n.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  square: state.square
});
export default connect(mapStateToProps)(withStyles(styles)(SimpleTable));
