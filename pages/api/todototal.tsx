import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "../../node_modules/next/dist/shared/lib/utils";
import {prisma} from '../../prisma/db'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const totalTodo = await prisma.post.count();
  const totalPage = totalTodo % 2 > 0 ? Math.floor(totalTodo / 10) + 1 : totalTodo / 10
  res.status(200).json(totalPage)
}

