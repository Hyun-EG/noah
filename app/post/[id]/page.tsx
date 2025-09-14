// app/post/[id]/page.tsx
import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import PostDetail from "./_components/PostDetail";
import { PostDataType } from "./_components/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PostDetailPage = async (props: any) => {
  const client = await connectDB();
  const db = client.db("noah");
  const data = await db.collection("post").findOne({
    _id: new ObjectId(props.params.id),
  });

  const serializedData: PostDataType | null = data
    ? {
        _id: data._id.toString(),
        title: data.title,
        description: data.description,
        category: data.category,
        content: data.content,
        authorId: data.authorId,
        createdAt: data.createdAt,
      }
    : null;

  return <PostDetail data={serializedData} />;
};

export default PostDetailPage;
