import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import retrieveReducers from 'redux-retrieval/reducers';
import { TYPES } from 'redux-retrieval/actions';
import reduceReducers from 'reduce-reducers';
import selectionsReducer from 'redux-selections/reducers';

export const itemSelections = reduceReducers(
  (state = [], action) => {
    switch (action.type) {
      case TYPES.RETRIEVE_SUCCESS:
        return action.payload.items.map(item => ({ id: item.id, selected: false }));
      default:
        return state;
    }
  },
  selectionsReducer
);

export default combineReducers({
  form,
  itemSelections,
  ...retrieveReducers,
});
