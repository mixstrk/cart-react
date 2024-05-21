import React from "react";

export default class extends React.Component{
  state = {
    cnt: this.props.min
  };

  decrease = () => {
    this.set(this.state.cnt - 1)
  }
 
  increase = () => {
    this.set(this.state.cnt + 1)
  }

  set(newCnt){
    let cnt = Math.min(Math.max(newCnt, this.props.min), this.props.max);
    this.setState({cnt})
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
