import mongoose from 'mongoose';

const connectMongo = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  console.log('Using new connection');
  await mongoose.connect(process.env.MONGO_URI || '');
};

export default connectMongo;
