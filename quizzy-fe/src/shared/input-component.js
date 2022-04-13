import PropTypes from 'prop-types';
import React from "react";
import './input-style.scss';
const InputField = ({
  name,
  type,
  placeholder,
  onChange,
  className,
  value,
  error,
  children,
  label,
  ...props
}) => {
  
  return (
    <React.Fragment>
      <label className='floating-label' htmlFor={name}>{label}</label>
      <input
      required
      
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
        style={error && {border: 'solid 1px red'}}
      />
      { error && <p>{ error }</p>}
    </React.Fragment>
  )
}

InputField.defaultProps = {
  type: "text",
  name: "input-name",
  className: "default-input"
}

InputField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func
}
export default InputField;