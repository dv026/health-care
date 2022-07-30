import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    [cookie.serialize("accessToken", "", {
      httpOnly: false,
      secure: true,
      expires: new Date(0),
      sameSite: "none",
      path: "/",
    }), cookie.serialize("refreshToken", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
      sameSite: "none",
      path: "/",
    })]
  );

  res.status(200).end();
}