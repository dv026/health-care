import axios from "axios";

import { refreshMiddleware, refreshMiddlewareError } from './interceptors';

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_SERVICE_BASE_URL,
  withCredentials: true
})

authApi.interceptors.response.use(refreshMiddleware, refreshMiddlewareError)