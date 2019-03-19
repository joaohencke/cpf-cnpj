import axios from 'axios';

const endpoint = '/api/status';

export async function fetch() {
  try {
    const res = await axios.get(endpoint);
    return res.data;
  } catch (e) {
    throw new Error('Problemas de comunicação com o servidor');
  }
}

export default fetch;
