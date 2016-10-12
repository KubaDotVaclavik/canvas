import { combineReducers } from 'redux';
import circles from './circles/reducer'

const reducer = () => {
  let entities = combineReducers({
      circles
  })

  let reducer = combineReducers({
    entities
  });

  return reducer;
};

export default reducer;
