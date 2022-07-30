import type { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies';
import { AuthService } from '../../../services/auth'

export default function checkAuth(req: NextApiRequest, res: NextApiResponse) {
  const parsedCookies = parseCookies({ req });
  return AuthService.checkAuth('accessToken=' + parsedCookies.accessToken).then((response) => {
    // set cookie from response
    console.log(response)
    res.json(response.data)
  }).catch((e) => new Error(e))
}