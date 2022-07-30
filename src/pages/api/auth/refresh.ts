import { AuthService } from '../../../services/auth';
import type { NextApiRequest, NextApiResponse } from 'next'
const { parseCookies } = require('nookies');

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const parsedCookies = parseCookies({ req });
 
  const res1 = await AuthService.refresh('refreshToken=' + parsedCookies.refreshToken)
  console.log(res1)
  // return AuthService.refresh('refreshToken=' + parsedCookies.refreshToken)
  //   .then((response) => {
  //     console.log('data', response.data)
  //     if (response.headers['set-cookie']) {
  //       res.setHeader('Set-Cookie', response.headers['set-cookie'])
  //     }
  //     res.json(response.data)
  //   }).catch((e) => {
  //     res.status(501).json(e)
  //   })
}


