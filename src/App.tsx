import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import { GlobalStyle } from './App.style';
import AppRouter from './router';

const App: FC = () => {
  return (
    <div className="App">
      <GlobalStyle/>
      <AppRouter/>
    </div>
  );
};

export default hot(App);