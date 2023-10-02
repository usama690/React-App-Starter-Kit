import mongoose from 'mongoose';

export const connectDb = async () => {
  try {

    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log('CONNECTED TO DB SUCCESSFULLY!!!');
   
  } catch (error) {
    console.log('DB CONNECTION FAILED');
    console.log(error);
    console.log('\n');
  }
};







