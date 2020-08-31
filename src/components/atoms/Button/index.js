import React from "react";

const Button = (props) => {
  if (props.isLoading) {
    return <button disabled>loading . . .</button>;
  } else {
    return (
      <button
        className={[
          "btn-primary",
          props.className,
        ].join(" ")}
        style={props.style}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  }
};

export default Button;
