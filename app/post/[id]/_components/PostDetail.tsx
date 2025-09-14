"use client";

import { ObjectId } from "mongodb";
import HeaderBox from "./header/HeaderBox";
import ContentBox from "./main/ContentBox";
import { PostDataType } from "./types";

const PostDetail = ({ data }: { data: PostDataType }) => {
  return (
    <section className="flex flex-col gap-4 px-2 py-10">
      <header>
        <HeaderBox title={data.title} date={data.createdAt} />
      </header>
      <main>
        <ContentBox content={data.content} />
      </main>
      <footer>댓글/공유하기 기능</footer>
    </section>
  );
};

export default PostDetail;
