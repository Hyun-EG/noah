"use client";

import Image from "next/image";
import { IoShareOutline } from "react-icons/io5";

type HeaderPropsType = {
  title: string;
  date: string;
  imgUrl: string;
};

const HeaderBox = ({ title, date, imgUrl }: HeaderPropsType) => {
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
            <button className="px-2 py-1 bg-primary dark:bg-dark rounded-lg text-white">
              편집
            </button>
            <button className="px-2 py-1 bg-primary dark:bg-dark rounded-lg text-white">
              삭제
            </button>
          </div>
        </div>
      </div>
      {/* <Image
        className="w-full laptop:w-[60%] desktop:w-[60%] h-52 laptop:min-h-96 desktop:min-h-96 mt-4 bg-blue-500 rounded-lg"
        width={100}
        height={100}
        src={imgUrl}
        alt={`${title}의 대표이미지`}
        quality={100}
        priority
      /> */}
    </section>
  );
};

export default HeaderBox;
