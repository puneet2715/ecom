import { ListingData } from './listing.type';

/**
 * Seller data type
 */
export type SellerData = {
  // _id: string;
  id: string;
  name: string;
  contactNumber: string;
  location: string;
  address: string;
  gender: string;
  image: string;
  totalListings: number;
  listings?: ListingData[];
};
