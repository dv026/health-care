import axios from "axios";

import { refreshMiddleware, refreshMiddlewareError } from './interceptors';

export const coreApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_SERVICE_BASE_URL,
  withCredentials: true
})

coreApi.interceptors.request.use((request) => {
  request.headers = {
    'authentication': `Bearer ${getCookie('accessToken')}`
  }
  return request
})
coreApi.interceptors.response.use(refreshMiddleware, refreshMiddlewareError)


function getCookie(name: string) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}