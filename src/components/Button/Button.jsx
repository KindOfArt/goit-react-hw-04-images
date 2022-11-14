import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type, label, classNameButton, onLoadMore }) => {
  return (
    <button onClick={onLoadMore} type={type} className={classNameButton}>
      <span>{label}</span>
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  classNameButton: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.string.isRequired,
  ]),
  onLoadMore: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.func.isRequired,
  ]),
};

export default Button;
