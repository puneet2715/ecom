import { Schema, model, models } from 'mongoose';

const listingSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  costPrice: {
    type: String,
    required: true,
  },
  sellingPrice: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'Seller',
    required: true,
  },
});

listingSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

listingSchema.set('toJSON', {
  virtuals: true,
});

const Listing = models.Listing || model('Listing', listingSchema);

export default Listing;
