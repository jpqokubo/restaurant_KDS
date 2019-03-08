import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import {
  get_categories,
  filter_category,
  order_bycategory
} from "../../actions/squareActions";

class Categories extends Component {
  state = {
    items: [],
    categories: [],
    selectedOption: "",
    inputValue: "",
    loaded: false
  };

  onInputChange = (inputValue, { action }) => {
    console.log(inputValue, action);

    switch (action) {
      case "input-change":
        this.setState({ inputValue, selected: inputValue });

        return;
      case "menu-close":
        let menuIsOpen = undefined;
        if (this.state.inputValue) {
          menuIsOpen = true;
        }
        this.setState({
          menuIsOpen
        });
        return;
      default:
        return;
    }
  };

  async componentDidMount() {
    await this.props.get_categories();

    this.setState({ loaded: true });
  }

  handleChange = selectedOption => {
    const items = this.props.square.items;
    this.setState({ selectedOption });
    this.props.filter_category(selectedOption);
    this.props.order_bycategory(selectedOption, items);
  };

  content() {
    const styleSheet = {
      options: (base, state) => ({
        ...base,

        fontFamily: "Helvetica, sans-serif !important",
        fontSize: 13,
        fontWeight: 900,
        color: "green"
      })
    };
    const labelCategory = [];
    this.props.square.categories.map(category => {
      return labelCategory.push({
        label: (
          <Typography style={{ textTransform: "capitalize" }}>
            {category.name}
          </Typography>
        ),

        value: category.name
      });
    });

    const { inputValue, menuIsOpen, selectedOption } = this.state;

    return (
      <Select
        styles={{ styleSheet }}
        isMulti
        onChange={this.handleChange}
        value={selectedOption}
        isClearable
        isSearchable
        inputValue={inputValue}
        onInputChange={this.onInputChange}
        name="name"
        options={labelCategory}
        menuIsOpen={menuIsOpen}
      />
    );
  }
  render() {
    return (
      <React.Fragment>
        {this.state.loaded ? this.content() : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  square: state.square
});
export default connect(
  mapStateToProps,
  { get_categories, filter_category, order_bycategory }
)(Categories);
