"use client";

import HeaderBox from "./header/HeaderBox";
import ContentBox from "./main/ContentBox";
import { PostDataType } from "./types";

const PostDetail = ({ data }: { data: PostDataType | null }) => {
  if (!data) {
    return (
      <section className="flex flex-col gap-4 px-2 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600">
            게시글을 찾을 수 없습니다
          </h1>
          <p className="text-gray-500 mt-2">
            존재하지 않는 게시글이거나 삭제된 게시글입니다.
          </p>
        </div>
      </section>
    );
  }

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
