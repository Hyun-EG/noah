import { connectDB } from "@/lib/connectDB";
import PostDetail from "./_components/PostDetail";
import { PostDataType } from "./_components/types";
import { ObjectId } from "mongodb";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PostDetailPage = async (props: any) => {
  const client = await connectDB();
  const db = client.db("noah");
  const data = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  return <PostDetail data={data as PostDataType} />;
};

export default PostDetailPage;
