import React from 'react';
import { Provider } from 'react-redux'
import './styles/index.css'
import { Map } from './components/map'
import { configureStore } from "./store/configure-store";

const store = configureStore();

export const App = () => {
  return(
    <Provider store={store}>
      <Map />
    </Provider>
  )
};
