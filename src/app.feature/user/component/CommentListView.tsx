import { useData } from '../hook/useData';
import useMutate from '../hook/useMutate';
import { Comment } from '../type';

type Props = {
  postId: number;
};

const CommentListView = ({ postId }: Props) => {
  const { data: comments, error, loading } = useData<Comment[]>('/comments', []);
  const { mutate } = useMutate('/comments', 'post');

  const handleAddComment = async (postId: number, content: string) => {
    mutate({ postId, content });
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!comments) return null;

  return (
    <div>
      <h4>댓글</h4>
      {comments
        .filter((comment) => comment.postId === postId)
        .map((comment) => (
          <p key={comment.id}>{comment.content}</p>
        ))}
      <input
        type="text"
        placeholder="새 댓글"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddComment(postId, e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
      />
    </div>
  );
};

export default CommentListView;
