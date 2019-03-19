import actions from './actions/types';

const initialState = {
  data: {
    searchCounter: 0,
    uptime: 0,
  },
  fetching: false,
};

export default function supportReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH: {
      return {
        data: action.value,
        fetching: false,
      };
    }
    case actions.FETCHING: {
      return {
        ...state,
        fetching: action.value,
      };
    }

    default:
      return state;
  }
}
