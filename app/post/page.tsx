import React from "react";
import PostController from "./_components/PostController";
import PostContainer from "./_components/PostContainer";
import { connectDB } from "@/lib/connectDB";
import { PostDataType } from "./[id]/_components/types";

const PostPage = async () => {
  const client = await connectDB();
  const db = client.db("noah");
  const data = await db.collection("post").find().toArray();
  return (
    <section className="px-2">
      <header>
        <PostController />
      </header>
      <main>
        <PostContainer data={data as PostDataType[]} />
      </main>
    </section>
  );
};

export default PostPage;
