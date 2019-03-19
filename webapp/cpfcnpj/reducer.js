import actions from './actions/types';

const initialState = {
  list: {
    fetching: false,
    items: [],
    filter: '',
    page: 0,
    total: 0,
    order: {
      by: 'createdAt',
      reverse: true,
    },
    timeout: undefined,
  },
  put: {
    _id: undefined,
    value: '',
    blacklist: false,
    submitting: false,
  },
};

export default function cpfcnpjReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH: {
      return {
        ...state,
        list: {
          ...state.list,
          items: action.items,
          total: action.total,
          fetching: false,
        },
      };
    }

    case actions.FETCHING: {
      return {
        ...state,
        list: {
          ...state.list,
          fetching: action.value,
        },
      };
    }
    case actions.SET_PAGE: {
      return {
        ...state,
        list: {
          ...state.list,
          page: action.value,
        },
      };
    }
    case actions.FILTER: {
      return {
        ...state,
        list: {
          ...state.list,
          ...action.value,
        },
      };
    }
    case actions.PUT: {
      return {
        ...state,
        put: { ...initialState.put },
      };
    }
    case actions.SUBMITTING: {
      return {
        ...state,
        put: {
          ...state.put,
          submitting: action.value,
        },
      };
    }
    case actions.MODEL_CHANGE:
    case actions.GET: {
      return {
        ...state,
        put: {
          ...state.put,
          ...action.value,
        },
      };
    }
    default:
      return state;
  }
}
