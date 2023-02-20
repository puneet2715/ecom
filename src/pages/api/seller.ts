import type { NextApiRequest, NextApiResponse } from 'next';
import Seller from '@/models/Seller';
import connectMongo from '@/utils/mongo';
import { SellerData } from '@/types/seller.type';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectMongo();
  switch (req.method) {
    case 'GET':
      const sellers = await Seller.aggregate<
        SellerData & { totalListings: number }
      >([
        {
          $lookup: {
            from: 'listings',
            localField: '_id',
            foreignField: 'sellerId',
            as: 'listings',
          },
        },
        {
          $addFields: {
            totalListings: { $size: '$listings' },
            id: '$_id',
          },
        },
        {
          $unset: ['listings'],
        },
      ]);
      res.status(200).send(sellers);
      break;
    case 'POST':
      const newSeller = await Seller.create(req.body);
      res.status(200).send(newSeller);
      break;
    case 'PUT':
      const updatedSeller = await Seller.findByIdAndUpdate(
        req.body.id,
        req.body,
        {
          new: true,
          overwrite: true,
        },
      );
      res.status(200).send(updatedSeller);
      break;
    case 'PATCH':
      const modifiedSeller = await Seller.findByIdAndUpdate(
        req.body.id,
        req.body,
        {
          new: true,
        },
      );
      res.status(200).send(modifiedSeller);
      break;
    case 'DELETE':
      await Seller.findByIdAndDelete(req.body.id);
      res.status(200).send({ message: 'Seller deleted' });
      break;
    default:
      res.status(400).send({ message: 'Invalid request' });
      break;
  }
}
