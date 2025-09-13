import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URI;
const client = new MongoClient(url as string);
declare global {
  var _mongo: Promise<MongoClient> | undefined;
}

if (!global._mongo) global._mongo = client.connect();

export async function connectDB(): Promise<MongoClient> {
  return await global._mongo!;
}
