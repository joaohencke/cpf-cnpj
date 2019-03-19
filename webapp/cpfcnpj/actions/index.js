import actions from './types';
import * as service from '../service';

export function fetch(args) {
  return async dispatch => {
    try {
      const res = await service.fetch(args);
      return dispatch({ type: actions.FETCH, ...res, ...args });
    } catch (e) {
      return dispatch({ type: actions.FETCH, err: e });
    }
  };
}

export function put(args) {
  return async dispatch => {
    try {
      const res = await service.put(args);
      return dispatch({ type: actions.FETCH, ...res });
    } catch (e) {
      return dispatch({ type: actions.PUT, err: e });
    }
  };
}

export function getFromServer(args) {
  return async dispatch => {
    try {
      const res = await service.get(args);
      return dispatch({ type: actions.GET, value: res });
    } catch (e) {
      return dispatch({ type: actions.GET, err: e });
    }
  };
}

export function setFetching(args) {
  return dispatch => dispatch({ type: actions.FETCHING, value: args });
}

export function setPage(args) {
  return dispatch => dispatch({ type: actions.SET_PAGE, value: args });
}

export function setFilter(args) {
  return dispatch => dispatch({ type: actions.FILTER, value: args });
}

export function setSubmitting(args) {
  return dispatch => dispatch({ type: actions.SUBMITTING, value: args });
}

export function modelChange(args) {
  return dispatch => dispatch({ type: actions.MODEL_CHANGE, value: args });
}
