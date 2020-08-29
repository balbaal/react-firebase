import React from "react";

const Button = (props) => {
  if (props.isLoading) {
    return <button disabled>loading . . .</button>;
  } else {
    return (
      <button style={props.style} onClick={props.onClick}>
        {props.children}
      </button>
    );
  }
};

export default Button;
