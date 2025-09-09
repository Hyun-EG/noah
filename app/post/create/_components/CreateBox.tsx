"use client";

import Editor from "./Editor";

const CreateBox = () => {
  return (
    <section className="flex flex-col gap-4">
      <input
        type="text"
        className="w-full h-10 p-2 border border-gray-300 rounded-md"
        placeholder="제목"
      />
      <input
        type="text"
        className="w-full h-10 p-2 border border-gray-300 rounded-md"
        placeholder="설명"
      />
      <Editor value="" onChange={() => {}} />
      <button className="w-full h-10 mobile:mt-10 laptop:mt-0 desktop:mt-0 bg-primary dark:bg-dark text-white rounded-md">
        작성하기
      </button>
    </section>
  );
};

export default CreateBox;
