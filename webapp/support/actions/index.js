import actions from './types';
import * as service from '../service';

export function fetch() {
  return async dispatch => {
    try {
      const res = await service.fetch();
      return dispatch({ type: actions.FETCH, value: res });
    } catch (e) {
      return dispatch({ type: actions.FETCH, err: e });
    }
  };
}

export function setFetching(args) {
  return { type: actions.FETCHING, value: args };
}
