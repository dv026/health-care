import { ICredentials, LoginResponse } from './interface';
import { IUser } from '../../interfaces/user';
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { authApi } from '../../api/auth.api';
const https = require('https');

export class AuthService {
  static async login(credentials: ICredentials): Promise<AxiosResponse<LoginResponse>> {
    return await authApi.post('/login', credentials)
  }

  static async registration(credentials: ICredentials): Promise<LoginResponse> {
    const response = await authApi.post('/registration', credentials)
    return response.data
  }

  static async checkAuth(cookie: string) {
    try {
      const res = await authApi.get('/check-auth', {
        headers: {
          cookie: cookie,
        }
      })
      return res.data.user
    } catch (e) {
      return null
      throw new Error()
    }
  }

  /**
   * @deprecated
   */
  static async logout() {
    document.cookie = 'accessToken=; Max-Age=0'
    await authApi.get('/logout')
  }

  static async refresh(cookie: string) {

    console.log('cookie !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', cookie)//Promise<AxiosResponse<{ user: IUser }>> {
  // static async refresh(cookie: any = {}): Promise<IUser> {
    // const config: AxiosRequestConfig = {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      // key: fs.readFileSync(process.env.AUTH_CERTIFICATE_KEY_PATH),
      // cert: fs.readFileSync(process.env.AUTH_CERTIFICATE_PEM_PATH),
    });
    const config: AxiosRequestConfig = {
      baseURL: process.env.NEXT_PUBLIC_AUTH_SERVICE_REMOTE_BASE_URL,
      withCredentials: true,
      httpAgent: httpsAgent,
      // headers: {
      //   authentication: 'Bearer'
      // },
    }
    // if (cookie) {
    //   config.headers = {
    //     Cookie: cookie
    //   }
    // }
    // return axios.get('/refresh', config)
    // return fetch(process.env.NEXT_PUBLIC_AUTH_SERVICE_REMOTE_BASE_URL + '/refresh', {
    //   method: 'GET',
    //   credentials: 'include'
    // })

    console.log('process.env.NEXT_PUBLIC_AUTH_SERVICE_REMOTE_BASE_URL', process.env.NEXT_PUBLIC_AUTH_SERVICE_REMOTE_BASE_URL + '/refresh')
    console.log('config', config)
    return axios(process.env.NEXT_PUBLIC_AUTH_SERVICE_REMOTE_BASE_URL + '/refresh')
    // return authApi.get('/api/auth/refresh', {
    //   headers: { cookie }
    // })

  }
}