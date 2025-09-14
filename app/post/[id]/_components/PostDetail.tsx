"use client";

import { ObjectId } from "mongodb";
import HeaderBox from "./header/HeaderBox";
import ContentBox from "./main/ContentBox";

export interface PostDataType {
  _id: ObjectId;
  title: string;
  description: string;
  category: string;
  content: string;
  authorId: string;
  createdAt: string;
}

interface PostDetailProps {
  data: PostDataType[];
}

const PostDetail = () => {
  return (
    <section className="flex flex-col gap-4 px-2 py-10">
      <header>
        <HeaderBox title="ㅇ" date="d" imgUrl="d" />
      </header>
      <main>
        <ContentBox />
      </main>
      <footer>댓글/공유하기 기능</footer>
    </section>
  );
};

export default PostDetail;
