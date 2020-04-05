import axios from 'axios';

import { IPFS_S3 } from '../common/config';

const api = axios.create({
  baseURL: IPFS_S3,
});

export default api;
