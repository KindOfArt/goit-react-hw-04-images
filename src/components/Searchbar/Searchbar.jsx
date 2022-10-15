import PropTypes from 'prop-types';

import { Component } from 'react';

export default class Searchbar extends Component {
  state = { inputQuery: '' };

  onInputChange = e => {
    this.setState({ inputQuery: e.currentTarget.value });
  };

  onFormSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;

    onSubmit(this.state.inputQuery);
  };

  render() {
    const { children } = this.props;

    return (
      <header className="Searchbar">
        <form onSubmit={this.onFormSubmit} className="SearchForm">
          <input
            value={this.state.inputQuery}
            onChange={this.onInputChange}
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
  }
}

Searchbar.propTypes = {
  children: PropTypes.element.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
