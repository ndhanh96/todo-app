import { NextApiRequest, NextApiResponse } from "../../node_modules/next/dist/shared/lib/utils";
import { NextResponse } from "../../node_modules/next/server";


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  res.status(200).json('hi')
}

