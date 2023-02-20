import mongoose from 'mongoose';

const connectMongo = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  console.log('Using new connection');
  console.log('Connecting to MongoDB...', process.env.MONGO_URI);
  await mongoose.connect(process.env.MONGO_URI || '');
};

export default connectMongo;
