export const LOAD_ITEMS = 'LOAD_ITEMS';
export const LOAD_ITEMS_SUCCESS = 'LOAD_ITEMS_SUCCESS';
export const LOAD_ITEMS_FAIL = 'LOAD_ITEMS_FAIL';

export function loadItems() {
  return {
    type: LOAD_ITEMS,
    meta: {
      thunk: true,
    },
  };
}

export function loadItemsSuccess(payload, thunk) {
  return {
    type: LOAD_ITEMS_SUCCESS,
    payload,
    meta: {
      thunk,
    },
  };
}

export function loadItemsFail(thunk) {
  return {
    type: LOAD_ITEMS_FAIL,
    error: true,
    meta: {
      thunk,
    },
  };
}
