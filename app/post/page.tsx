import React from "react";
import PostController from "./_components/PostController";
import PostContainer from "./_components/PostContainer";
import { connectDB } from "@/lib/connectDB";
import { PostDataType } from "./[id]/_components/types";

const PostPage = async () => {
  const client = await connectDB();
  const db = client.db("noah");
  const data = await db.collection("post").find().toArray();

  const posts: PostDataType[] = data.map((post) => ({
    _id: post._id.toString(),
    title: post.title,
    description: post.description,
    category: post.category,
    thumbnail: post.thumbnail,
    content: post.content,
    authorId: post.authorId,
    createdAt: post.createdAt,
  }));
  return (
    <section className="px-2">
      <header>
        <PostController />
      </header>
      <main>
        <PostContainer data={posts} />
      </main>
    </section>
  );
};

export default PostPage;
