import React, {useState} from "react";

export default function(props){
  const { min = 0, max = 10 } = props;
  let [cnt, setCnt] = useState(1);

  let decrease = () => {
    if (cnt > min && cnt != 1) {
      setCnt(cnt - 1);
    }
  }

  let increase = () => {
    if (cnt < max) {
      setCnt(cnt + 1);
    }
  }

  let handleChange = (event) => {
    let value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > min && value <= max) {
      setCnt(value);
    }
  }

  return (
    <div>
      <button onClick={decrease}>-</button>
      <span>{cnt}</span>
      <button onClick={increase}>+</button>
    </div>
  );
}
