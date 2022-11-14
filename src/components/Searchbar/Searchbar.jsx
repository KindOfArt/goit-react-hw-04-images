import PropTypes from 'prop-types';
import { useState } from 'react';

const Searchbar = ({ children, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const onInputChange = e => setInputValue(e.currentTarget.value);

  const onFormSubmit = e => {
    e.preventDefault();

    onSubmit(inputValue);
  };

  return (
    <header className="Searchbar">
      <form onSubmit={onFormSubmit} className="SearchForm">
        <input
          value={inputValue}
          onChange={onInputChange}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        {children}
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  children: PropTypes.element.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
