export type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
};

export type Post = {
  id: number;
  title: string;
  content: string;
  userId: number;
};

export type Comment = {
  id: number;
  postId: number;
  content: string;
};
