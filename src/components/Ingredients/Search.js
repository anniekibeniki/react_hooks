import React, { useState, useEffect } from 'react';
import api from '../../api';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [ inputValue, setInputValue ] = useState('');
  const { onFilterIngredients, dispatchHttp } = props;

  useEffect(() => {
    const query = !inputValue ? '' : `?orderBy="title"&equalTo="${inputValue}"`;
    dispatchHttp({ type: 'SEND'});
    api.sendRequest('GET', `/ingredients.json${query}`)
      .then(data => {
        dispatchHttp({ type: 'SUCCESS_RESPONSE'});
        const loadedIngredients = Object.entries(data).reduce(( acc, [ key, obj]) => {
          acc.push({ id: key, ...obj });
          return acc;
        }, [])
        onFilterIngredients(loadedIngredients);
      })
      .catch(() => {
        dispatchHttp({ type: 'ERROR_RESPONSE', payload: 'Error on getting ingredients'});
      });
  }, [inputValue, onFilterIngredients, dispatchHttp]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={inputValue} onChange={ e => setInputValue(e.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
