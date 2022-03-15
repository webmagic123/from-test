import React from 'react';
import { Provider } from 'react-redux';

import { saveState } from './browser-storage';
import { debounce } from 'debounce';
import { store } from './store';
import Home from './Home';

store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 800)
);

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
