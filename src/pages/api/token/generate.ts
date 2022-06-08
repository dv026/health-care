import type { NextApiRequest, NextApiResponse } from 'next'
const jwt = require('jsonwebtoken')


export default function generate(req: NextApiRequest, res: NextApiResponse) {
  console.log(req)
  const { user } = req.body
  console.log('generate api', user)

  const accessToken = jwt.sign({ email: 'dima'}, 'liza', {
    expiresIn: '30m'
  })
  const refreshToken = jwt.sign({ email: 'dima'}, 'liza', {
    expiresIn: '30d'
  })

  res.status(200).json({ accessToken, refreshToken })
}
