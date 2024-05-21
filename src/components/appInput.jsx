import React from "react";
import PropTypes from "prop-types";

export default class extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onKeyUp: PropTypes.func,
    style: PropTypes.object
  }

  handleInput = (e) => {
    if (this.props.onInput) {
      this.props.onInput(e);
    }
  }

  handleChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  handleInputBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  handleInputKeyUp = (e) => {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(e);
    }
  }

  render() {
    return (
      <input
        value={this.props.value}
        onChange={this.handleChange}
        onBlur={this.handleInputBlur}
        onKeyUp={this.handleInputKeyUp}
        style={this.props.style}
      />
    )
  }
}
