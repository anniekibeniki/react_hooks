import React, { useState } from 'react';
import sleep from '../utils/sleep';

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
});



export const AuthContextProvider = (props) => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const loginHandler = async() => {
    await sleep(300);
    setIsLoggedIn(true);
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login: loginHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
 