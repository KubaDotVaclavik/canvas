import createMiddleware from './middleware';
import createReducer from './reducer';
import { applyMiddleware, createStore } from 'redux';

const configureStore = (options = { initialState: {} }) => {
  const { initialState } = options;

  const reducer = createReducer();
  const middleware = createMiddleware();

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
  );

  return store;
};

export default configureStore;
