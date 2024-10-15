import { useData } from '../hook/useData';
import { Post } from '../type';
import CommentListView from './CommentListView';
import PostDeleteButtonView from './PostDeleteButtonView';

type Props = {
  isAdmin: boolean;
};

const PostListView = ({ isAdmin }: Props) => {
  const { data: posts, error, loading } = useData<Post[]>('/posts', []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!posts) return null;

  return posts.map((post) => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <PostDeleteButtonView isAdmin={isAdmin} id={post.id} />
      <CommentListView postId={post.id} />
    </div>
  ));
};

export default PostListView;
