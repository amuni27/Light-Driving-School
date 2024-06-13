import * as mongoose from "mongoose";

const dbConnection = () => {
    if (process.env.MONGODB_URI)
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => console.log("MongoDB Connected!"))
            .catch(err => console.log("Mongodb connection failed", err));
    else
        console.log("MONGODB_URI connection failed");
}

export default dbConnection;