import axios from 'axios';

const endpoint = (path = '') => `/api/cpf-cnpj${path}`;

async function create({ value, blacklist }) {
  const res = await axios.post(endpoint(), { value, blacklist });
  return res.data;
}

async function update({ _id, value, blacklist }) {
  const res = await axios.put(endpoint(`/${_id}`), { _id, value, blacklist });
  return res.data;
}

export function put({ _id, ...args }) {
  const isCreation = _id === undefined;

  if (isCreation) return create(args);
  return update({ _id, ...args });
}

export async function fetch({ filter, order, page }) {
  const res = await axios.get(endpoint(`?filter=${filter}&order=${order}&page=${page}`));
  return res.data;
}

export function mask(value) {
  if (value.length > 11) return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

  return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
}
