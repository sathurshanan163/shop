import mongoose from "mongoose";

const connect_db = async () => {
    try {
      const con = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB connected: ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    };
};

export default connect_db;