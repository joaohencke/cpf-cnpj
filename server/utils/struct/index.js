const { superstruct } = require('superstruct');
const Boom = require('boom');
const validator = require('validator');
const { handler } = require('../error');

const validations = require('../../../common/validations');

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
    return handler(res, Boom.badRequest(exports.formatErrorMessage(error)));
  }
};
