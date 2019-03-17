import React from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';

import { mask as maskFn } from '../cpfcnpj/service';

const Input = ({ value, ...props }) => {
  const regex = /\D/g;

  function mask(v) {
    const rawValue = v.replace(regex, '');

    if (rawValue.length > 11) {
      return [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    }
    return [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  }
  let initialValue = value;

  if (initialValue) initialValue = maskFn(value);

  return <MaskedInput {...props} mask={mask} value={initialValue} />;
};

Input.propTypes = {
  value: PropTypes.string,
};

Input.defaultProps = {
  value: '',
};

export default Input;
