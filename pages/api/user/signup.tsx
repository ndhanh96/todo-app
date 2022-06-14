import { prisma } from '../../../prisma/db';
import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import * as argon2 from 'argon2';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({req});
  const { method } = req;
  if (!session && method == 'POST') {
    const checkEmailInDB = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    })
    console.log('check email',checkEmailInDB)
    if(checkEmailInDB == null) {
      const createUser = await prisma.user.create({
        data: {
          email: req.body.email,
          password: await argon2.hash(req.body.password)
        }
      })
      res.status(200).json('created user')
    } else {
      res.status(401).json('user existed')
    }
  } else {
    res.status(400).json('Already Login')
  }
}
