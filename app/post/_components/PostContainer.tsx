"use client";

import Image from "next/image";
import { PostDataProps } from "../[id]/_components/types";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import LoadingSpinner from "@/app/(components)/common/LoadingSpinner";

const PostContainer = React.memo(({ data }: PostDataProps) => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const posts = useMemo(
    () =>
      data.map((item, index) => {
        const isLoading = loadingStates[item._id] !== false;
        return (
          <div
            key={`${item._id}-${index}`}
            className="mobile:w-full laptop:w-96 desktop:w-96 h-72 rounded-xl cursor-pointer bg-[#F9F9F9] dark:bg-dark"
          >
            <Link
              className="duration-500 hover:text-tertiary"
              href={`/post/${item._id}`}
            >
              <div className="relative w-full h-44 bg-gray-100 rounded-xl overflow-hidden">
                {isLoading && (
                  <div className="w-full h-full flex justify-center items-center bg-dark">
                    <LoadingSpinner />
                  </div>
                )}
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-fill"
                  priority={true}
                  onLoad={() =>
                    setLoadingStates((prev) => ({ ...prev, [item._id]: false }))
                  }
                />
                <div className="absolute top-0 right-0 flex items-center justify-center w-16 h-5 px-4 py-3 bg-sky-500 rounded-xl text-white">
                  <p className="text-sm">{item.category}</p>
                </div>
              </div>
              <article className="p-2">
                <p className="pb-2 text-2xl overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.title}
                </p>
                <p
                  className="overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.description}
                </p>
              </article>
            </Link>
          </div>
        );
      }),
    [data, loadingStates]
  );
  return (
    <main className="flex flex-wrap gap-4 justify-center laptop:justify-start desktop:justify-start">
      {posts}
    </main>
  );
});

PostContainer.displayName = "PostContainer";

export default PostContainer;
