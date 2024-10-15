import useMutate from '../hook/useMutate';
import { Post, User } from '../type';

type Props = {
  user: User;
  post: Post;
};

const PostDeleteButtonView = ({ post, user }: Props) => {
  const { mutate: handleDeletePost } = useMutate(`/posts/${post.id}`, 'delete');

  return user.role === 'admin' && <button onClick={() => handleDeletePost(post.id)}>삭제</button>;
};

export default PostDeleteButtonView;
