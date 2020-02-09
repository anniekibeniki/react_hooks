import React, { useContext } from 'react';
import AuthContext from './context/authContext';
import Auth from './components/Auth';
import Ingredients from './components/Ingredients/Ingredients';

const Layout = props => {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;

  return isLoggedIn ? <Ingredients /> : <Auth />
};

export default Layout;
