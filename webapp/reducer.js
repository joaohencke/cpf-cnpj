import { combineReducers } from 'redux';
import cpfcnpj from './cpfcnpj/reducer';
import support from './support/reducer';

export default combineReducers({
  cpfcnpj,
  support,
});
