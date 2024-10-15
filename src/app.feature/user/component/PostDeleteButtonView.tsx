import useMutate from '../hook/useMutate';

type Props = {
  id: number;
  isAdmin: boolean;
};

const PostDeleteButtonView = ({ isAdmin, id }: Props) => {
  const { mutate: handleDeletePost } = useMutate(`/posts/${id}`, 'delete');

  return isAdmin && <button onClick={handleDeletePost}>삭제</button>;
};

export default PostDeleteButtonView;
