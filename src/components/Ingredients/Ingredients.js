import React, { useCallback, useReducer, useMemo } from 'react';
import api from '../../api';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

const ingredientsReducer = (curState, { type, payload }) => {
  switch (type) {
    case 'SET':
      return payload;
    case 'ADD':
      return [ ...curState, payload];
    case 'DELETE':
      return curState.filter(ingredient => ingredient.id !== payload);
    default:
      throw new Error('Should not drop here!');
  }
}

const httpReducer = (curState, { type, payload }) => {
  switch (type) {
    case 'SEND':
      return { loading: true, errorMsg: null };
    case 'SUCCESS_RESPONSE':
      return { ...curState, loading: false };
    case 'ERROR_RESPONSE':
      return { loading: false, errorMsg: payload };
    case 'CLEAR_ERROR':
      return { ...curState, errorMsg: null };
    default:
      throw new Error('Should not drop here!');
  }
}

const Ingredients = () => {
  const [ ingredients, dispatch] = useReducer(ingredientsReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null});

  const addIngredientHandler = useCallback((newIngredient) => {
    dispatchHttp({ type: 'SEND'});
    api.sendRequest('POST', '/ingredients.json', newIngredient)
      .then(data => {
        dispatchHttp({ type: 'SUCCESS_RESPONSE'});
        dispatch({ type: 'ADD', payload: { id: data.name, ...newIngredient} });
      })
      .catch(e => {
        console.log(e);
        dispatchHttp({ type: 'ERROR_RESPONSE', payload: 'Something went wrong on adding ingredients'});
      });
  }, []);

  const closeModalHandler = useCallback(() => {
    dispatchHttp({ type: 'CLEAR_ERROR' });
  }, []);

  const removeIngredientHandler = useCallback((id) => {
    dispatchHttp({ type: 'SEND'});
    api.sendRequest('DELETE', `/ingredients/${id}.json`)
      .then(() => {
        dispatchHttp({ type: 'SUCCESS_RESPONSE'});
        dispatch({ type: 'DELETE', payload: id });
      })
      .catch(() => {
        dispatchHttp({ type: 'ERROR_RESPONSE', payload: 'Something went wrong on removing an ingredient'});
      });
  }, []);

  const filterIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({ type: 'SET', payload: filteredIngredients });
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
    );
  }, [ingredients, removeIngredientHandler]);

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} isLoading={httpState.loading} />

      <section>
        <Search onFilterIngredients={filterIngredientsHandler} dispatchHttp={dispatchHttp} />
        {ingredientList}
      </section>
      {httpState.errorMsg && <ErrorModal onClose={closeModalHandler}>{httpState.errorMsg}</ErrorModal>}
    </div>
  );
}

export default Ingredients;
