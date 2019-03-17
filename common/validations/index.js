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

module.exports = validations;
