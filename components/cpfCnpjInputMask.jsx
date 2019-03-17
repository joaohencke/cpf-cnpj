import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';

const Input = (props) => {
  const regex = /\D/g;

  function mask(value) {
    const rawValue = value.replace(regex, '');

    if (rawValue.length > 11) {
      return [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    } else {
      return [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    }
  }

  return (
    <MaskedInput {...props} mask={mask} />
  );
};

export default Input;