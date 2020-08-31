import React from "react";

const Button = (props) => {
  if (props.isLoading) {
    return <button disabled>loading . . .</button>;
  } else {
    return (
      <button
        className={[
          "bg-teal-500 rounded px-6 hover:bg-teal-700 py-2 text-white font-bold",
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
