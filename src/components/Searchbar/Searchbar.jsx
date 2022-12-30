import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import '../Searchbar/Searchbar.css';
import PropTypes from 'prop-types';

const SearchBar =({onSubmit}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  const handleChange = event => {
    const input = event.currentTarget.value;
    setQuery(input);
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="search-btn">
          <span className="button-label">
            <BsSearch />
          </span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};