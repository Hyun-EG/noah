export interface PostDataType {
  _id: string;
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
