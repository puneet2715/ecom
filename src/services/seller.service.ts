import Seller from '@/models/Seller';
import { SellerData } from '@/types/seller.type';
import { Types } from 'mongoose';
import connectMongo from '@/utils/mongo';

export const getSellers = async () => {
  await connectMongo();

  const sellers = await Seller.aggregate<SellerData>([
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
  return sellers;
};

export const getSellerById = async (id: string) => {
  await connectMongo();

  const sellers = await Seller.aggregate<SellerData>([
    {
      $match: {
        _id: new Types.ObjectId(id),
      },
    },
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
  ]);
  if (!sellers.length) throw new Error('Seller not found');
  const seller = sellers[0];
  seller.listings = seller.listings?.map((listing) => {
    listing.id = (listing as any)._id;
    return listing;
  });
  return seller;
};
