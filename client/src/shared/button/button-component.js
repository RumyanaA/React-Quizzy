import PropTypes from "prop-types";
import React from "react";
import "./button-style.scss";
const Button = ({ type, onClick,id, className, children, label, ...props }) => {
  return (
    <React.Fragment>
      <button id={id} type={type} onClick={onClick} className={className}>
        {label}
      </button>
    </React.Fragment>
  );
};
Button.defaultProps = {
    type: "button",
    className: "primary-button"
  }
  
  Button.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func
  }
  export default Button;
