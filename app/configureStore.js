import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from 'reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const canUseDOM = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

let createStoreWithMiddleware;
if (canUseDOM) {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    applyMiddleware(createLogger())
  )(createStore);
} else {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunk)
  )(createStore);
}

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
