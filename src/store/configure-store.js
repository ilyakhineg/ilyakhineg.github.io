import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducers } from './rootReducer';

export function configureStore() {
  const middlewareEnhancer = applyMiddleware(thunk);
  const composeEnchancers = composeWithDevTools({
    trace: true,
    traceLimit: 25,
  });
  return  createStore(rootReducers, composeEnchancers(middlewareEnhancer));
}

