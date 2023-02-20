import type { NextApiRequest, NextApiResponse } from 'next';
import Seller from '@/models/Seller';
import connectMongo from '@/utils/mongo';
import { getSellers } from '@/services/seller.service';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectMongo();
  switch (req.method) {
    case 'GET':
      const sellers = await getSellers();
      res.status(200).send(sellers);
      break;
    case 'POST':
      const newSeller = await Seller.create(req.body);
      res.status(201).send(newSeller);
    default:
      res.status(405).send({ message: 'Request not allowed' });
      break;
  }
}
