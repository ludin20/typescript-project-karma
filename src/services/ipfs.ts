import axios from 'axios';

import { IPFS_URL } from '../common/config';

const api = axios.create({
  baseURL: IPFS_URL,
});

export default api;
