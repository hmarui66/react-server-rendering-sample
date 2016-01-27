import { INIT_DID_MOUNT, LOADED_ME } from 'actions';

export default function app(state = {
  didMount: false,
  me: {}
}, action) {
  switch (action.type) {
    case INIT_DID_MOUNT:
      return Object.assign({}, state,
        { didMount: true }
      );
    case LOADED_ME:
      const { me } = action;
      return Object.assign({}, state,
        { me }
      );
    default:
      return state;
  }
}
