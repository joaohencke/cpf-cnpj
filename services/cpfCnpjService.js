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
