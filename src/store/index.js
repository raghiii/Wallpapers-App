import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import images from './reducer/images';

const rootReducer = combineReducers({
  images
});

export default function configureStore() {
  const enhancer = compose(applyMiddleware(thunk));
  let store = createStore(rootReducer, enhancer);

  return { store };
}
