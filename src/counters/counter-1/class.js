import React from "react";

export default class extends React.Component{
  state = {
    cnt: 1
  };

  decrease = () => {
    if (this.state.cnt > this.props.min && this.state.cnt != 1) {
      this.setState({
        cnt: this.state.cnt - 1
      });
    }
  }

  increase = () => {
    if (this.state.cnt < this.props.max) {
      this.setState({
        cnt: this.state.cnt + 1
      });
    }
  }

  handleChange = (event) => {
    let value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > this.props.min && value <= this.props.max) {
      this.setState({
        cnt: value
      })
    }
  }

  render(){
    return (
      <div>
        <button onClick={this.decrease}>-</button>
        <span>{this.state.cnt}</span>
        <button onClick={this.increase}>+</button>
      </div>
    );
  }
}
