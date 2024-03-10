import mongoose from "mongoose";

export default async function connectToDb(url: string) {
    try {
        const connection = await mongoose.connect(url);

        return connection;
    } catch (err) {
        throw err;
    }
}
