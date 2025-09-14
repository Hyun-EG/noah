import { connectDB } from "@/lib/connectDB";
import PostDetail, { PostDataType } from "./_components/PostDetail";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PostDetailPage = async (props: any) => {
  console.log(props);
  //   const client = await connectDB();
  //   const db = client.db("noah");
  //   const data = (await db.collection("post").find().toArray()) as PostDataType[];
  //   console.log(data);
  return <PostDetail />;
};

export default PostDetailPage;
