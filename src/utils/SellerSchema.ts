import mongoose from './mongo';

const sellerSchema = new mongoose.Schema({
  name: String,
  contactNumber: String,
  location: String,
  address: String,
  gender: String,
  image: String,
});

export const Seller = mongoose.model('Seller', sellerSchema);
