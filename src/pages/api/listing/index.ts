import type { NextApiRequest, NextApiResponse } from 'next';
import Listing from '@/models/Listing';
import connectMongo from '@/utils/mongo';
import { ListingData } from '@/types/listing.type';
import { Types } from 'mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectMongo();
  switch (req.method) {
    case 'GET':
      const listing: ListingData[] = await Listing.find({});
      res.status(200).send(listing);
      break;
    case 'POST':
      const newListing = await Listing.create({
        ...req.body,
        sellerId: new Types.ObjectId(req.body.sellerId),
      });
      res.status(200).send(newListing);
      break;
    case 'PUT':
      const updatedListing = await Listing.findByIdAndUpdate(
        req.body.id,
        req.body,
        {
          new: true,
          overwrite: true,
        },
      );
      res.status(200).send(updatedListing);
      break;
    case 'PATCH':
      const modifiedListing = await Listing.findByIdAndUpdate(
        req.body.id,
        req.body,
        {
          new: true,
        },
      );
      res.status(200).send(modifiedListing);
      break;
    case 'DELETE':
      await Listing.findByIdAndDelete(req.body.id);
      res.status(200).send({ message: 'Listing deleted' });
      break;
    default:
      res.status(400).send({ message: 'Invalid request' });
      break;
  }
}
