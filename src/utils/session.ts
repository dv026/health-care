import { IUser } from './../interfaces/user';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import { Nullable } from '../types';

interface Session {
  exp: number
  iat: number
  user: IUser
}

export const getSessionServer = (context: any): Nullable<Session> => {
  const accessToken = context?.req?.cookies?.accessToken
  return extractDataFromAccessToken(accessToken)
}

export const useSession = (): Nullable<Session> => {
  const [cookies] = useCookies()
  return extractDataFromAccessToken(cookies.accessToken)
}

const extractDataFromAccessToken = (accessToken: string): Nullable<Session> => {
  if (!accessToken) return null
  try {
    if (typeof process.env.NEXT_PUBLIC_TOKEN_SECRET == "string") {
      return jwt.verify(accessToken, process.env.NEXT_PUBLIC_TOKEN_SECRET) as Session
    }
    return null
  } catch (e) {
    return null
  }
}