import { LOAD_ITEMS_SUCCESS } from './actions';

const initialState = {
  list: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ITEMS_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
}
