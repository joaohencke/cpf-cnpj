import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducer';

// const store = createStore(reducer, applyMiddleware(thunk));

// export default store;

export function initializeStore() {
  return createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
}

export { initializeStore as default };
