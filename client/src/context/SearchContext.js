// @flow
import React, {createContext, useState} from 'react';

export const SearchContext = createContext();

const SearchContextProvider = (props) => {
  const [searchQuery, setSearchQuery] = useState('fiction');
  const [searchTitle, setSearchTitle] = useState('Fiction');
  const [language, setLanguage] = useState('en');
  return (
    <SearchContext.Provider value={{ searchQuery, searchTitle, language, setSearchQuery, setLanguage, setSearchTitle }}>
      {props.children}
    </SearchContext.Provider>
  )
};

export default SearchContextProvider;