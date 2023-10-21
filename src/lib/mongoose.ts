import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
	mongoose.set("strictQuery", true);

	if (!process.env.MONGODB_URI) throw new Error("No MongoDB URI is defined!");

	if (isConnected) return console.log('=> using existing database connection');

	try {
		await mongoose.connect(process.env.MONGODB_URI);
		isConnected = true;
		console.log("MongoDB connected");
	} catch (e: any) {
		console.log(e);
		throw new Error(`Failed to connect to database: ${e.message}`);
	}

};


// ezzat
// gWTHBjfnjS35R6rt