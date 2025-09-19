"use client";

import { useRouter } from "next/navigation";
import { IoShareOutline } from "react-icons/io5";

type HeaderPropsType = {
  title: string;
  date: string;
};

const HeaderBox = ({ title, date }: HeaderPropsType) => {
  const router = useRouter();

  return (
    <section className="flex flex-col gap-2 w-full">
      <div className="inline-flex flex-col gap-2 pb-2 border-b border-dark dark:border-light">
        <h1 className="mobile:text-2xl laptop:text-4xl desktop:text-4xl">
          {title}
        </h1>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <p className="text-sm">{date}</p>
            <div className="flex gap-1 items-center">
              <span className="text-sm font-bold">공유하기</span>
              <button className="border border-dark dark:border-light rounded-full p-1">
                <IoShareOutline size={16} />
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                router.push("/post");
              }}
              className="px-2 py-1 bg-primary dark:bg-dark rounded-lg text-white"
            >
              목록
            </button>
            <button className="px-2 py-1 bg-primary dark:bg-dark rounded-lg text-white">
              편집
            </button>
            <button className="px-2 py-1 bg-primary dark:bg-dark rounded-lg text-white">
              삭제
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderBox;
