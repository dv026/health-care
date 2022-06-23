import axios from 'axios';
import { AxiosResponse } from 'axios';

import { AuthService } from './../services/auth.service';

export const refreshMiddleware = (response: AxiosResponse<any, any>) => response

export const refreshMiddlewareError = async (error: any) => {
  if (error.response.status === 401) {
    try {
      const user = await AuthService.refresh()
      if (user) {
        axios.request(error.config)
      }
      throw new Error('refresh token expires')
    } catch (e) {
      throw new Error('bad request')
    }
  }
  return Promise.reject(error);
}
