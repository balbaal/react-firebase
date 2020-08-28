import React from "react";

const Button = (props) => {
  if (props.isLoading) {
    return <button disabled>loading . . .</button>;
  } else {
    return <button onClick={props.onClick}>{props.children}</button>;
  }
};

export default Button;