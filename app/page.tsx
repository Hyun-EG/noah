import { connectDB } from "@/lib/connectDB";
import React from "react";

const page = async () => {
  const db = await (await connectDB).db("noah");
  if (db) {
    console.log("db connected");
  }
  return <div></div>;
};

export default page;
