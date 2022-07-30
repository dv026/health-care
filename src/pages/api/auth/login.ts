import type { NextApiRequest, NextApiResponse } from 'next'
import { AuthService } from '../../../services/auth'

export default function login(req: NextApiRequest, res: NextApiResponse) {
  return AuthService.login({ ...req.body }).then((response) => {
    // set cookie from response
    if (response.headers['set-cookie']) {
      res.setHeader("Set-Cookie", response.headers['set-cookie'])
    }
    res.json(response.data)
  }).catch((e) => new Error(e))
}