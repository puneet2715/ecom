import { Schema, model, models } from 'mongoose';
import { SellerData } from '@/types/seller.type';

const sellerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

sellerSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

sellerSchema.set('toJSON', {
  virtuals: true,
});

const Seller = models.Seller || model<SellerData>('Seller', sellerSchema);

export default Seller;
