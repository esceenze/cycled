import React, {PropTypes} from 'react';
import cx from 'classnames';


const renderInput = ({input, inputClass = 'form-control', containerClass = '', type, placeholder, meta: {touched, error, invalid}}) =>
  <div className={containerClass}>
    <input {...input}
      className={cx(inputClass, {
        'form-control-danger': invalid,
      })}
      type={type}
      placeholder={placeholder}
      />
    {touched &&
     error &&
     <small className="text-danger text-xs-left p-l-2">{error}</small>}
  </div>;

renderInput.propTypes = {
  input: PropTypes.any.isRequired,
  inputClass: PropTypes.string.isRequired,
  containerClass: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

export default renderInput;
