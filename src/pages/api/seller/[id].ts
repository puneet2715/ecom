import type { NextApiRequest, NextApiResponse } from 'next';
import Seller from '@/models/Seller';
import connectMongo from '@/utils/mongo';
import { SellerData } from '@/types/seller.type';
import { Types } from 'mongoose';
import { getSellerById } from '@/services/seller.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectMongo();
  const sellerId = req.query.id as string | undefined;

  if (!sellerId) {
    res.status(400).send({ message: 'Invalid seller id' });
    return;
  }

  switch (req.method) {
    case 'GET':
      try {
        const seller = getSellerById(sellerId);
        res.status(200).send(seller);
      } catch (error) {
        res.status(404).send({ message: 'Seller not found' });
      }
      break;
    case 'PUT':
      const updatedSeller = await Seller.findByIdAndUpdate(sellerId, req.body, {
        new: true,
        overwrite: true,
      });
      res.status(200).send(updatedSeller);
      break;
    case 'PATCH':
      const modifiedSeller = await Seller.findByIdAndUpdate(
        sellerId,
        req.body,
        {
          new: true,
        },
      );
      res.status(200).send(modifiedSeller);
      break;
    case 'DELETE':
      const deletedSeller = await Seller.findByIdAndDelete(sellerId);
      res.status(200).send(deletedSeller);
      break;
    default:
      res.status(405).send({ message: 'Invalid request' });
      break;
  }
}
