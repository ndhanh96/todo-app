import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { prisma } from '../../prisma/db';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const { method } = req;
  if (method == 'PUT' && session) {
    const checkUserHasPost = await prisma.post.findFirst({
      where: {
        post_id: req.body.post_id,
        user_email: session.user?.email,
      },
    });
    if (checkUserHasPost != null) {
      const getpost = await prisma.post.update({
        where: {
          post_id: req.body.post_id,
        },
        data: {
          content: req.body.content,
        },
      });
      res.status(200).json('updated');
    } else {
      res.status(500).json('the todo not belong to you.');
    }
  }
  if (!session) {
    res.status(500).json('error');
  }
}
