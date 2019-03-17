import axios from 'axios';

const endpoint = (path = '') => `/api/cpf-cnpj${path}`;

const defaultMsg = 'Problemas de comunicação com o servidor';

function handlePutError(e) {
  if (!e || !e.response) throw new Error(defaultMsg);
  const { response } = e;
  if (response && response.data && response.data.message) {
    const { message } = response.data;
    if (message.includes('already_registered')) throw new Error('Já possui cadastro no sistema');
    if (message.includes('invalid_cpf') || message.includes('invalid_cnpj')) throw new Error('Formato inválido');
  }
  throw new Error(defaultMsg);
}

async function create({ value, blacklist }) {
  try {
    const res = await axios.post(endpoint(), { value, blacklist });
    return res.data;
  } catch (e) {
    return handlePutError(e);
  }
}

async function update({ _id, value, blacklist }) {
  try {
    const res = await axios.put(endpoint(`/${_id}`), { _id, value, blacklist });
    return res.data;
  } catch (e) {
    return handlePutError(e);
  }
}

export function put({ _id, ...args }) {
  const isCreation = _id === undefined;

  if (isCreation) return create(args);
  return update({ ...args, _id });
}

export async function fetch({ filter, order, page }) {
  const res = await axios.get(endpoint(`?filter=${filter}&order=${order}&page=${page}`));
  return res.data;
}

export function mask(value) {
  if (value.length > 11) return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

  return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
}
