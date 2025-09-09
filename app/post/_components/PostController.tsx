"use client";
import { useRouter } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";

const PostController = () => {
  const router = useRouter();
  return (
    <section className="w-full h-12 px-2 flex justify-between items-center">
      <div>정렬기능추가예정</div>
      <div className="flex">
        <button
          onClick={() => {
            router.push("/post/create");
          }}
          className="px-2 py-1 flex justify-center itmes-center border border-light gap-1 bg-primary dark:bg-dark rounded-lg"
        >
          <span className="text-light">글쓰기</span>
          <FaRegEdit fill="#ffffff" size={20} />
        </button>
      </div>
    </section>
  );
};

export default PostController;
