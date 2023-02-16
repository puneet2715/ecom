import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from '@/utils/mongo';
import { Seller } from '@/utils/SellerSchema';

type Data = {
  name: string;
  contactNumber: string;
  location: string;
  address: string;
  gender: string;
  image: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    // Process a POST request
    // console.log(req.body);
    // await Seller.save({ ...req.body });
    res.status(200).json({
      name: 'John Doe',
      contactNumber: '1234567890',
      location: 'Bangalore',
      address: 'Bangalore',
      gender: 'Male',
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fw',
    });
  } else {
    // Handle any other HTTP method
    // res.status(200).json({ name: 'John Doe' });
  }
}
