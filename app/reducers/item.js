import { LOADED_ITEMS } from 'actions';

export default function item(state = {
  items: []
}, action) {
  switch (action.type) {
    case LOADED_ITEMS:
      const { items } = action;
      return Object.assign({}, state,
        { items }
      );
    default:
      return state;
  }
}
