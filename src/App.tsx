import React, { FC } from 'react';
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

export default App;