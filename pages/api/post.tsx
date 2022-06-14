import { prisma } from '../../prisma/db';
import { getSession } from 'next-auth/react';
import * as argon2 from 'argon2';
import {
  NextApiRequest,
  NextApiResponse,
} from '../../node_modules/next/dist/shared/lib/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const { method } = req;
  
  
  if (method == 'POST') {
    if (session) {
      const checkEmailInDB = await prisma.user.findUnique({
        where: {
          email: session?.user?.email!,
        },
      });
      if (checkEmailInDB == null) {
        //login with provider liek google or facebook... will 
        // create an account in DB if email is not in DB.
        const addAccount = await prisma.user.create({
          data: {
            email: session.user!.email!,
            name: 'test',
            password: await argon2.hash('asdasfasfa'),
          },
        });
      }
      const addPost = await prisma.post.create({
        data: {
          content: req.body,
          title: 'random',
          user_email: session.user!.email,
        },
      });
      res.status(200).json('added');
    } else {
      res.status(400).json('login first');
    }
  }
  if (method == 'DELETE') {
    if (session) {
      const ifUserHasTodo = await prisma.post.findFirst({
        where: {
          post_id: req.body.post_id,
          user_email: session?.user?.email,
        },
      });
      if (ifUserHasTodo != null) {
        const deletePost = await prisma.post.delete({
          where: {
            post_id: req.body.post_id,
          },
        });
        res.status(200).json(deletePost);
      }
    } else {
      res.status(400).json('login first');
    }
  }
  if (method == 'GET') {
    const allPost = await prisma.post.findMany();
    res.status(200).json(allPost);
  }
}
