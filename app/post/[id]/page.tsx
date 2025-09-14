import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import PostDetail from "./_components/PostDetail";
import { PostDataType } from "./_components/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PostDetailPage = async (props: any) => {
  console.log(props);
  const client = await connectDB();
  const db = client.db("noah");
  const data = await db.collection("post").findOne({ title: props.params.id });
  return <PostDetail data={data as PostDataType} />;
};

export default PostDetailPage;
