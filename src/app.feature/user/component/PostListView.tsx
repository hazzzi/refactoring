import { useData } from '../hook/useData';
import { Post, User } from '../type';
import CommentListView from './CommentListView';
import PostDeleteButtonView from './PostItemView';

type Props = {
  user: User;
};

const PostListView = ({ user }: Props) => {
  const { data: posts, error, loading } = useData<Post[]>('/posts', []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!posts) return null;

  return posts.map((post) => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <PostDeleteButtonView post={post} user={user} />
      <CommentListView post={post} />
    </div>
  ));
};

export default PostListView;
