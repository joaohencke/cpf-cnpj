const { superstruct } = require('superstruct');
const Boom = require('boom');
const validator = require('validator');

const validations = {
  cpf: v => {
    if (!v || v.length !== 11) return 'invalid_cpf';

    let sum = 0;
    let remain;

    for (let i = 1; i <= 9; i += 1) sum += parseInt(v.substring(i - 1, i), 10) * (11 - i);

    remain = (sum * 10) % 11;

    if (remain === 10 || remain === 11) remain = 0;

    if (remain !== parseInt(v.substring(9, 10), 10)) return 'invalid_cpf';

    sum = 0;

    for (let i = 1; i <= 10; i += 1) sum += parseInt(v.substring(i - 1, i), 10) * (12 - i);

    remain = (sum * 10) % 11;
    if (remain === 10 || remain === 11) remain = 0;
    if (remain !== parseInt(v.substring(10, 11), 10)) return 'invalid_cpf';

    return true;
  },

  cnpj: v => {
    if (!v || v.length !== 14) return 'invalid_cnpj';
    let length = v.length - 2;
    let numbers = v.substring(0, length);
    const digits = v.substring(length);
    let sum = 0;
    let pos = length - 7;
    for (let i = length; i >= 1; i -= 1) {
      sum += numbers.charAt(length - i) * pos;
      pos -= 1;
      if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0), 10)) return 'invalid_cnpj';
    length += 1;
    numbers = v.substring(0, length);
    sum = 0;
    pos = length - 7;
    for (let i = length; i >= 1; i -= 1) {
      sum += numbers.charAt(length - i) * pos;
      pos -= 1;
      if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1), 10)) return 'invalid_cnpj';
    return true;
  },
};

exports.struct = superstruct({
  types: {
    cpf: validations.cpf,
    cnpj: validations.cnpj,

    cpfcnpj: v => {
      const validCpf = validations.cpf(v);
      const validCnpj = validations.cnpj(v);

      const { toString } = Object.prototype;
      const string = '[object String]';

      if (toString.call(validCnpj) === string && toString.call(validCpf) === string) {
        return 'invalid_cpf_cnpj';
      }

      return true;
    },

    mongoId: value => {
      if (value === undefined) return 'mongoid_required';
      if (!validator.isMongoId(value)) return 'invalid_mongoid';
      return true;
    },
  },
});

exports.formatErrorMessage = error => {
  let errMessage = `${error.message}`;
  if (error.reason) errMessage += ` - ${error.reason}`;
  if (errMessage.length > 250) {
    errMessage = `${errMessage.slice(0, 150)} ... ${errMessage.slice(errMessage.length - 100, errMessage.length)}`;
  }
  return errMessage;
};

exports.validator = (reqPath, schema) => (req, res, next) => {
  try {
    const Schema = exports.struct.partial(schema);

    req.validData = {
      ...req.validData,
      ...Schema(req[reqPath]),
    };

    return next();
  } catch (error) {
    return next(Boom.badRequest(exports.formatErrorMessage(error)));
  }
};
