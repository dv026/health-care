/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { AuthService } from '../../services/auth'
const https = require('https');
var fs = require("fs")
import cookie from 'cookie'
const { parseCookies, setCookie, destroyCookie } = require('nookies');

export default (req: NextApiRequest, res: NextApiResponse) => {

  // console.log('check cookie')
  // console.log(req.headers)
  res.json({ success: true });
}