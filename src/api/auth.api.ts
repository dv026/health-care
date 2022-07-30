import axios from "axios";
const https = require('https');

import { refreshMiddleware, refreshMiddlewareError } from './interceptors';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  // key: fs.readFileSync(process.env.AUTH_CERTIFICATE_KEY_PATH),
  // cert: fs.readFileSync(process.env.AUTH_CERTIFICATE_PEM_PATH),
});

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_SERVICE_REMOTE_BASE_URL,
  withCredentials: true,
  httpsAgent: httpsAgent
})

authApi.interceptors.response.use(refreshMiddleware, refreshMiddlewareError)