import { ObjectId } from "mongodb";

export interface PostDataType {
  _id: ObjectId;
  title: string;
  description: string;
  category: string;
  content: string;
  authorId: string;
  createdAt: string;
}

export interface PostDataProps {
  data: PostDataType[];
}
