import Image from "next/image";
import testImg from "@/public/icons/icon-logo-512x512.png";

const PostContainer = () => {
  return (
    <main className="flex flex-wrap gap-4 justify-center laptop:justify-start desktop:justify-start">
      <div className="w-96 h-72 border border-secondary rounded-xl cursor-pointer">
        <div className="h-44 bg-black rounded-xl overflow-hidden">
          <Image
            className="w-full h-full object-cover rounded-xl hover:duration-500 hover:scale-110"
            src={testImg}
            alt="테스트 이미지"
          />
        </div>
        <article className="p-2">
          <p className="pb-2 text-2xl overflow-hidden text-ellipsis whitespace-nowrap">
            TitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitle
          </p>
          <p
            className="overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다
          </p>
        </article>
      </div>
    </main>
  );
};

export default PostContainer;
