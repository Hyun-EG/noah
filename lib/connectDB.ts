import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URI;
const client = new MongoClient(url as string);
let connectDB: Promise<MongoClient>;

declare global {
  var _mongo: Promise<MongoClient> | undefined;
}

if (!global._mongo) global._mongo = client.connect();
// eslint-disable-next-line prefer-const
connectDB = global._mongo;

console.log(connectDB);

export { connectDB };
