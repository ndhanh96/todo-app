import { prisma } from '../../prisma/db';
import { PrismaClient } from '@prisma/client';
import {
  NextApiRequest,
  NextApiResponse,
} from '../../node_modules/next/dist/shared/lib/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await prisma.post.findMany({
    skip: (2 - 1) * 10,
    take: 10,
    // orderBy: [
    //   {
    //     post_id: 'desc'
    //   }
    // ]
  });
  res.status(200).json(posts);
}
