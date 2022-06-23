import { IUser } from './../interfaces/user';
import axios, { AxiosProxyConfig, AxiosRequestConfig, AxiosResponse } from "axios"
import { Nullable } from '../types';
import { useCookies } from 'react-cookie';
import { authApi } from '../api/auth.api';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

export interface ICredentials {
  username: string,
  password: string
}

interface LoginResponse {
  id: string,
  email: string
}

export class AuthService {
  static async login(credentials: ICredentials): Promise<LoginResponse> {
    const response = await authApi.post('/login', credentials, {
      withCredentials: true
    })
    return response.data
  }

  static async checkAuth() {
    try {
      const res = await authApi.get('/check-auth', {
        withCredentials: true
      })
      return res.data.user
    } catch (e) {
      return null
      throw new Error()
    }
  }

  static async logout() {
    document.cookie = 'accessToken=; Max-Age=0'
    await authApi.get('/logout', {
      withCredentials: true,
    })
  }

  static async refresh(cookie: string = ''): Promise<AxiosResponse<{ user: IUser }>> {
  // static async refresh(cookie: any = {}): Promise<IUser> {
    // const config: AxiosRequestConfig = {
    const config: any = {
      baseURL: process.env.NEXT_PUBLIC_AUTH_SERVICE_BASE_URL,
      withCredentials: true
    }
    if (cookie) {
      config.headers = {
        Cookie: cookie
      }
    }
    return axios.get('/refresh', config)
  }
}