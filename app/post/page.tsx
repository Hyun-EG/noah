import React from "react";
import PostController from "./_components/PostController";
import PostContainer from "./_components/PostContainer";

const PostPage = () => {
  return (
    <section className="px-2">
      <header>
        <PostController />
      </header>
      <main>
        <PostContainer />
      </main>
    </section>
  );
};

export default PostPage;
