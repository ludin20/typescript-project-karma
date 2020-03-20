import axios from 'axios';

import { SERVER_URL } from '../common/config';

const api = axios.create({
  baseURL: SERVER_URL,
});

export default api;
