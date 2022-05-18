import PropTypes from 'prop-types';
import React from 'react';
import './button-style.scss';

function Button({
  type, onClick, id, className, label,
}) {
  return (
    <button id={id} type={type} onClick={onClick} className={className}>
      {label}
    </button>
  );
}
Button.defaultProps = {
  type: 'button',
  className: 'primary-button',
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
};
export default Button;
