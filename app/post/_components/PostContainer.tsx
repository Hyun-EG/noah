import Image from "next/image";
import testImg from "@/public/icons/icon-logo-512x512.png";
import { PostDataProps } from "../[id]/_components/types";
import Link from "next/link";

const PostContainer = ({ data }: PostDataProps) => {
  return (
    <main className="flex flex-wrap gap-4 justify-center laptop:justify-start desktop:justify-start">
      {data.map((item) => (
        <div
          key={item.title}
          className="mobile:w-full laptop:w-96 desktop:w-96 h-72 border border-secondary rounded-xl cursor-pointer"
        >
          <Link href={`/post/${item.title}`}>
            <div className="h-44 bg-black rounded-xl overflow-hidden">
              <Image
                className="w-full h-full object-cover rounded-xl hover:duration-500 hover:scale-110"
                src={testImg}
                alt="테스트 이미지"
              />
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
      ))}
    </main>
  );
};

export default PostContainer;
