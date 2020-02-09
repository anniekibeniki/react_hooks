import React from 'react';
import { AuthContextProvider } from './context/authContext';
import Layout from './Layout';

const App = props => {
  return (
    <AuthContextProvider>
      <Layout />
    </AuthContextProvider>
  )
};

export default App;
