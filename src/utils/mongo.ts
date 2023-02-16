import mongoose from 'mongoose';

const uri = process.env.MONGO_URI || '';

mongoose.connect(uri);

export default mongoose;
